import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./SignIn.css"

function SignIn() {
  let navigate = useNavigate();
  let [emailError, setEmailError] = useState(false);
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  function postData() {

    fetch("https://prt-fullstack-backend.onrender.com/signin", {
      method: "POST",
      body: JSON.stringify({
        email, password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(function (response) {
        console.log(response);
        if (response.message === "Login successful ") {
          navigate(`/display/${email}`)
        } else {
          alert("user doesn't exists")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  let emailHandler = (e) => {
    let value = e.target.value;
    if (!value.match(emailRegex)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(value);
  };

  let passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  let submitHandler = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("All fields are necessary")
    } else {
      postData()
    }

  }
  return (
    <div className="sign-container">
      <form className="main-boxing" onSubmit={submitHandler}>
        <h1>Member login</h1>

        <div>

          <input placeholder="Username" className="input-boxing" type="email" name="email" value={email} onChange={emailHandler} />
          {emailError ? <div className="error">Invalid Email</div> : ""}
        </div>
        <div>

          <input
            placeholder="Password"
            className="input-boxing"
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <button className="btn" type="submit">Login</button>
        <Link to="/signUp">Sign Up</Link>
      </form>

    </div>
  );
}
export default SignIn;