import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import '../Styles/VoiceCall.css';

const VoiceCall = () => {
    const [socket, setSocket] = useState(null);
    const [peer, setPeer] = useState(null);
    const [stream, setStream] = useState(null);
    const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, ended
    const [isCallInitiator, setIsCallInitiator] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const [callerId, setCallerId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [connectedUsers, setConnectedUsers] = useState([]);
    
    const localAudioRef = useRef();
    const remoteAudioRef = useRef();
    const socketRef = useRef();

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        socketRef.current = newSocket;

        // Register user
        newSocket.emit('register-user', { userId: `user_${Date.now()}` });

        // Listen for connected users
        newSocket.on('users-list', (users) => {
            setConnectedUsers(users.filter(user => user.id !== newSocket.id));
        });

        // Listen for incoming calls
        newSocket.on('incoming-call', ({ from, signal }) => {
            setIncomingCall({ from, signal });
            setCallStatus('incoming');
        });

        // Listen for call accepted
        newSocket.on('call-accepted', ({ signal }) => {
            if (peer) {
                peer.signal(signal);
                setCallStatus('connected');
            }
        });

        // Listen for call ended
        newSocket.on('call-ended', () => {
            endCall();
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCall = async (targetUserId) => {
        try {
            setCallStatus('calling');
            setReceiverId(targetUserId);
            
            // Get user media
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: true, 
                video: false 
            });
            setStream(mediaStream);
            
            if (localAudioRef.current) {
                localAudioRef.current.srcObject = mediaStream;
            }

            // Create peer connection
            const newPeer = new Peer({
                initiator: true,
                trickle: false,
                stream: mediaStream
            });

            newPeer.on('signal', (signal) => {
                socket.emit('call-user', {
                    to: targetUserId,
                    signal,
                    from: socket.id
                });
            });

            newPeer.on('stream', (remoteStream) => {
                if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = remoteStream;
                }
                setCallStatus('connected');
            });

            newPeer.on('error', (err) => {
                console.error('Peer error:', err);
                setCallStatus('error');
            });

            setPeer(newPeer);
            setIsCallInitiator(true);
        } catch (error) {
            console.error('Error starting call:', error);
            setCallStatus('error');
        }
    };

    const acceptCall = async () => {
        try {
            setCallStatus('connecting');
            
            // Get user media
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: true, 
                video: false 
            });
            setStream(mediaStream);
            
            if (localAudioRef.current) {
                localAudioRef.current.srcObject = mediaStream;
            }

            // Create peer connection
            const newPeer = new Peer({
                initiator: false,
                trickle: false,
                stream: mediaStream
            });

            newPeer.on('signal', (signal) => {
                socket.emit('accept-call', {
                    to: incomingCall.from,
                    signal
                });
            });

            newPeer.on('stream', (remoteStream) => {
                if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = remoteStream;
                }
                setCallStatus('connected');
            });

            newPeer.on('error', (err) => {
                console.error('Peer error:', err);
                setCallStatus('error');
            });

            newPeer.signal(incomingCall.signal);
            setPeer(newPeer);
            setIncomingCall(null);
        } catch (error) {
            console.error('Error accepting call:', error);
            setCallStatus('error');
        }
    };

    const rejectCall = () => {
        socket.emit('reject-call', { to: incomingCall.from });
        setIncomingCall(null);
        setCallStatus('idle');
    };

    const endCall = () => {
        if (peer) {
            peer.destroy();
            setPeer(null);
        }
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        
        if (socket && callStatus === 'connected') {
            socket.emit('end-call', { 
                to: isCallInitiator ? receiverId : incomingCall?.from 
            });
        }
        
        setCallStatus('idle');
        setIsCallInitiator(false);
        setIncomingCall(null);
        setReceiverId('');
    };

    const toggleAudio = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioEnabled(audioTrack.enabled);
            }
        }
    };

    const renderCallInterface = () => {
        switch (callStatus) {
            case 'idle':
                return (
                    <div className="call-interface">
                        <h3>Available Users</h3>
                        <div className="users-list">
                            {connectedUsers.length === 0 ? (
                                <p>No users available for calling</p>
                            ) : (
                                connectedUsers.map(user => (
                                    <div key={user.id} className="user-item">
                                        <span>{user.userId || user.id}</span>
                                        <button 
                                            className="call-btn"
                                            onClick={() => startCall(user.id)}
                                        >
                                            📞 Call
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );

            case 'calling':
                return (
                    <div className="call-interface calling">
                        <div className="call-status">
                            <div className="calling-animation">📞</div>
                            <p>Calling...</p>
                            <button className="end-call-btn" onClick={endCall}>
                                End Call
                            </button>
                        </div>
                    </div>
                );

            case 'incoming':
                return (
                    <div className="call-interface incoming">
                        <div className="incoming-call">
                            <div className="ringing-animation">📞</div>
                            <p>Incoming call from {incomingCall?.from}</p>
                            <div className="call-actions">
                                <button className="accept-btn" onClick={acceptCall}>
                                    ✅ Accept
                                </button>
                                <button className="reject-btn" onClick={rejectCall}>
                                    ❌ Reject
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'connected':
                return (
                    <div className="call-interface connected">
                        <div className="call-controls">
                            <div className="call-info">
                                <div className="connected-indicator">🟢</div>
                                <p>Call Connected</p>
                            </div>
                            <div className="control-buttons">
                                <button 
                                    className={`audio-btn ${isAudioEnabled ? 'enabled' : 'disabled'}`}
                                    onClick={toggleAudio}
                                >
                                    {isAudioEnabled ? '🎤' : '🔇'}
                                </button>
                                <button className="end-call-btn" onClick={endCall}>
                                    📞 End Call
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'connecting':
                return (
                    <div className="call-interface connecting">
                        <div className="call-status">
                            <div className="connecting-animation">⏳</div>
                            <p>Connecting...</p>
                        </div>
                    </div>
                );

            case 'error':
                return (
                    <div className="call-interface error">
                        <div className="error-message">
                            <p>❌ Call failed. Please try again.</p>
                            <button className="retry-btn" onClick={() => setCallStatus('idle')}>
                                Try Again
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="voice-call-container">
            <div className="voice-call-header">
                <h2>🎙️ Voice Call Support</h2>
                <p>Connect with parking administrators for assistance</p>
            </div>
            
            {renderCallInterface()}
            
            {/* Hidden audio elements */}
            <audio ref={localAudioRef} muted autoPlay />
            <audio ref={remoteAudioRef} autoPlay />
        </div>
    );
};

export default VoiceCall;