import React from "react";
import { useState } from "react";
// import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../rtk/Slices/userSlice";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [signinObj, setSigninObj] = useState({});
  // const [errMessage, setErrMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelsignvalue = (e) => {
    setSigninObj({ ...signinObj, [e.target.id]: e.target.value.trim() });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!signinObj.email || !signinObj.password) {
      //  return setErrMessage("Please fill all the fields");

      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      // setLoading(true);
      // setErrMessage(null);
      dispatch(signInStart());

      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinObj),
      });
      const data = await res.json();
      if (data.success === false) {
        // return setErrMessage(res.data.message);
        dispatch(signInFailure(data.message));
      }

      // alert("Account created successful");
      // setLoading(false);
      // dispatch(signInSuccess(res.data));

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // setErrMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
      return;
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
                {loading ? "Loading..." : "SIGN IN"}
              </button>
            </form>
            <button type="submit" className="gooleBtn">
              Continue With Google
            </button>
            <div className="haveAccountCon">
              <div>Don't Have an Account</div>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
            {errMessage && <div className="errorMessage">{errMessage}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

//////////////////////////////////////////////////////////////

// import React from "react";
// import { useState } from "react";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../rtk/Slices/userSlice";

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// export default function Signin() {
//   const [signinObj, setSigninObj] = useState({});
//   const { loading, error: errMessage } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handelsignvalue = (e) => {
//     setSigninObj({ ...signinObj, [e.target.id]: e.target.value.trim() });
//   };

//   const handelSubmit = async (e) => {
//     e.preventDefault();

//     if (!signinObj.email || !signinObj.password) {
//       return dispatch(signInFailure("Please fill all the fields"));
//     }
//     try {
//       dispatch(signInStart());

//       const res = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(signinObj),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         return dispatch(signInFailure(data.message));
//       }

//       const data = await res.json();
//       dispatch(signInSuccess(data));
//       navigate("/");
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <>
//       <div className="container SignUp">
//         <div className="row rowCon">
//           <div className="col-lg-6 col-md-6 col-sm-12 firstrowCon">
//             <h2 className="logo">CHRIS</h2>
//             <h3>Blog</h3>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12 secondrowCon">
//             <form onSubmit={handelSubmit}>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 onChange={handelsignvalue}
//               />
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 onChange={handelsignvalue}
//               />

//               <button type="submit" disabled={loading}>
//                 {loading ? "Loading..." : "SIGN IN"}
//               </button>
//             </form>
//             <button type="submit" className="gooleBtn">
//               Continue With Google
//             </button>
//             <div className="haveAccountCon">
//               <div>Don't Have an Account</div>
//               <Link to={"/signup"}>Sign Up</Link>
//             </div>
//             {errMessage && <div className="errorMessage">{errMessage}</div>}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
