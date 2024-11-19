// import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Footer from "./Components/Footer"
// import Signup from "./Components/Signup"
import Parkingspace from "./Components/Parkingspace"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Login/>
      {/* <Signup/> */}
      <Parkingspace/>
      <Footer/>
    </div>
    
    
  );
}

export default App;
