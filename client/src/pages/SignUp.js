import { useState } from "react";
import React from "react";

import { Link } from "react-router-dom";
export default function SignUp() {
  const [signupObj, setSignupObj] = useState({});
  console.log(signupObj);

  const handelsignvalue = (e) => {
    setSignupObj({ ...signupObj, [e.target.id]: e.target.value });
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
            <form
            //  onSubmit={handelSubmit}
            >
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

              <button type="submit">Sign Up</button>
            </form>
            <button type="submit" className="gooleBtn">
              Continue With Google
            </button>
            <div className="haveAccountCon">
              <div>Have an Account</div>
              <Link to={"/login"}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
