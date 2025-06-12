import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import SignUp from "./pages/SignUp.tsx";
import UserProfile from "./pages/UserProfile.tsx"
import History from "./pages/FileHistory.tsx";
import Requests from "./pages/Requests.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />}/> */}
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/profile" element={<UserProfile />}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/request" element={<Requests/>}/>

      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/forgot" element={<ForgotPassword/>}/>
    </Routes>
    </BrowserRouter>
  )
}


export default App;
