// import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Footer from "./Components/Footer"
// import Signup from "./Components/Signup"
import Parkingspace from "./Components/Parkingspace"
import ParkingSpaceManager from "./Components/Parkingspacemanager"; // Import the new component
import VoiceCall from "./Components/VoiceCall"; // Import the voice call component

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Login/>
      {/* <Signup/> */}
      <Parkingspace/>
      <ParkingSpaceManager/>
      <VoiceCall/>
      <Footer/>
    </div>
    
    
  );
}

export default App;
