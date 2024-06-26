import Login from "./Login";
import OTPPage from "./OTPPage";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if ( token) {
      dispatch({ type: "SET_TOKEN", payload: token });
    }
  }, [dispatch]);

  return (       
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTPPage />} />
        </Routes>
  );
}   

export default App;
