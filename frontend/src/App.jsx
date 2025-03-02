// import { 
//   // BrowserRouter as Router, 
//   Routes, Route } from "react-router-dom";
// import SignIn from './pages/auth/sign-in'
// import SignUp from './pages/auth/sign-up'
import { Link, useNavigate } from "react-router-dom";

const App = () => {
  return (
      <div>
        {/* <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes> */}
        <h1>testing apps </h1>
<Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
            Sign up
          </Link>
      </div>
  )
}

export default App
