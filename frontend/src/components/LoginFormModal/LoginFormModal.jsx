import React, { useState } from "react";
import * as sessionActions from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.thunkLogin({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = async (e) => {
    setCredential('demo@user.io');
    setPassword('password');

    return dispatch(sessionActions.thunkLogin('demo@user.io', 'password'))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  }

  return (
    <div id='login-form'>
      <div id='formDiv'><h1>Log In</h1></div>
      <form onSubmit={handleSubmit}>
        <div id='formDiv'>
          <div><label>Username/Email:</label></div>
          <div>
            <input
              type="text"
              value={credential}
              onChange={(e) => {
                setCredential(e.target.value)
                if(errors.credential) setErrors({})
              }}
              required
            />
          </div>
        </div>
        <div id='formDiv'>
          <div><label>Password: </label></div>
          <div><input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if(errors.credential) setErrors({})
            }
          }
            required
          />
        </div>
        </div>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div id="loginBtnDiv"><button type="submit">Log In</button></div>
        <div id="loginBtnDiv"><button id='demo-btn' type="submit" onClick={e => handleDemoLogin(e)}>Demo</button></div>
      </form>
    </div>
  );
}

export default LoginFormModal;