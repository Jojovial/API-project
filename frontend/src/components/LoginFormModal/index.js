import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const loginDisabled = (credential.length < 4 || password.length < 6);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const logInDemo = (e) => {
    const demoUser = {
      credential: "demo@user.io",
      password: "password"
    }
    const { credential, password } = demoUser;
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if(data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <>
    <div className="LogIn">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="Form">
        <label>
          Username or Email
          <input
            id="Username"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            id="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button id="LogIn-Button" type="submit" disabled={loginDisabled}>Log In</button>
        <button id="DemoUser-Button" type="submit" onClick={logInDemo}>Demo User</button>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
