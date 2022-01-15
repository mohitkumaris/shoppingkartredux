import { useState } from "react";
import "./Login.css";
const LoginComponent = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeUsername = (e: any) => {
    setUserName(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    console.log(userName);
    console.log(password);
  };

  return (
    <div className="login-form">
      <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              onChange={handleChangeUsername}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </div>
        </div>
        <div className="action">
          <button type="button" onClick={handleSubmit}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginComponent;
