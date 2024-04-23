import { Route, Routes } from "react-router-dom";
import DesginLogin from "./Components/Login&Register/DesginLogin/DesginLogin";
import Login from "./Components/Login&Register/Login/Login";
import Register from "./Components/Login&Register/Register/Register";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <Toaster />
    <Routes>
      <Route path="/" element={<DesginLogin/> }children={<Route path="/" element={<Login/>}/>} />
      <Route path="/" element={<DesginLogin/> }children={<Route path="/register" element={<Register/>}/>} />
    </Routes>
    </div>
  );
}

export default App;
