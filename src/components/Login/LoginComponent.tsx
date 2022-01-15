import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleChangeUsername = (e: any) => {
    setUserName(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    console.log(userName);
    console.log(password);
    navigate("/shopping");
  };

  return (
    <div className="body-login">
      <div className="login-form">
        <form>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                onChange={handleChangeUsername}
              />
            </div>
            <div className="input-field">
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                onChange={handleChangePassword}
              />
            </div>
          </div>
          <div className="action">
            <button
              className="login-button"
              type="button"
              onClick={handleSubmit}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginComponent;
