import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import Alert from '@mui/material/Alert';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });
  const [err, setErr] = useState(false);
  const [already, setAlready] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setErr(false)
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setErr(true);
    } else {
      try {
        await axios.post("http://localhost:30000/api/auths/register", inputs).then((res) => {
          console.log(res)
        });
        navigate(from, { replace: true });
      } catch (error) {
        setErr(true);
      }

    }


  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hey there!</h1>
          <p>
            ConnectSphere is a social media platform that connects people from all around the world. It's a place where users can share their thoughts, ideas, and experiences with others.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {err && <Alert variant="filled" severity="error">
            Wrong Credentials
          </Alert>}
          <form>
            <input name="username" type="text" placeholder="Username" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <input name="name" type="text" placeholder="Name" onChange={handleChange} />
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
