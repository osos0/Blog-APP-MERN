import { useState } from "react";
import React from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [signupObj, setSignupObj] = useState({});
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelsignvalue = (e) => {
    setSignupObj({ ...signupObj, [e.target.id]: e.target.value.trim() });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!signupObj.username || !signupObj.email || !signupObj.password) {
      setErrMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      setErrMessage(null);

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        signupObj
      );
      if (res.data.success === false) {
        return setErrMessage(res.data.message);
      }
      // alert("Account created successful");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setErrMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container SignUp">
        <div className="row rowCon">
          <div className="col-lg-6 col-md-6 col-sm-12 firstrowCon">
            <h2 className="logo">CHRIS</h2>
            <h3>Blog</h3>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 secondrowCon">
            <form onSubmit={handelSubmit}>
              <input
                id="username"
                type="text"
                placeholder="Username"
                onChange={handelsignvalue}
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={handelsignvalue}
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handelsignvalue}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "SIGN UP"}
              </button>
            </form>
            <button type="submit" className="gooleBtn">
              Continue With Google
            </button>
            <div className="haveAccountCon">
              <div>Have an Account</div>
              <Link to={"/signin"}>Sign In</Link>
            </div>
            {errMessage && <div className="errorMessage">{errMessage}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
