import './Signup.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../redux/session";
import { useModal } from '../../context/modal';

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {closeModal} = useModal()

  useEffect(() => {
    if (sessionUser) return navigate('/')
  }, [navigate, sessionUser])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.thunkSignup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

      closeModal()
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id="signup-form">
      <div id='formDiv'><h1>Sign Up</h1></div>
      <form onSubmit={handleSubmit}>
        <div id="formDiv">
          <div><label>Email</label></div>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if(errors.email){
                  let newErrors = {...errors}
                  delete newErrors.email
                  setErrors(newErrors)
                }
              }}
              required
            />
          </div>
        </div>
        {errors.email && <p>{errors.email}</p>}
        <div id="formDiv">
          <div><label> Username</label></div>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) =>  {
                setUsername(e.target.value)
                if(errors.username){
                  let newErrors = {...errors}
                  delete newErrors.username
                  setErrors(newErrors)
                }
              }}
              required
            />
          </div>
        </div>
        {errors.username && <p>{errors.username}</p>}
        <div id="formDiv">
          <div><label>First Name</label></div>
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) =>  {
                setFirstName(e.target.value)
                if(errors.firstName){
                  let newErrors = {...errors}
                  delete newErrors.firstName
                  setErrors(newErrors)
                }
              }}
              required
            />
          </div>
        </div>
        {errors.firstName && <p>{errors.firstName}</p>}
        <div id="formDiv">
          <div><label>Last Name</label></div>
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) =>  {
                setLastName(e.target.value)
                if(errors.lastName){
                  let newErrors = {...errors}
                  delete newErrors.lastName
                  setErrors(newErrors)
                }
              }}
              required
            />
          </div>
        </div>
        {errors.lastName && <p>{errors.lastName}</p>}
        <div id="formDiv">
          <div><label>Password</label></div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) =>  {
                setPassword(e.target.value)
                if(errors.password){
                  let newErrors = {...errors}
                  delete newErrors.password
                  setErrors(newErrors)
                }
              }}
              required
            />
          </div>
        </div>
        {errors.password && <p>{errors.password}</p>}
        <div id="formDiv">
          <div><label>Confirm Password</label></div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>  {
                setConfirmPassword(e.target.value)
                if(errors.confirmPassword){
                  let newErrors = {...errors}
                  delete newErrors.confirmPassword
                  setErrors(newErrors)
                }
              }}
              required
            />
          </div>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div id="signupBtnDiv"><button type="submit">Sign Up</button></div>
      </form>
    </div>
  );
}

export default SignupFormModal;