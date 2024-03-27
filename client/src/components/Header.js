import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToggleTheme } from "../rtk/Theme/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChromecast } from "@fortawesome/free-brands-svg-icons";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
      <nav className="navbar navbar-expand-lg navDark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar scroll
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav mx-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="darkbtn" onClick={() => dispatch(ToggleTheme())}>
              <FontAwesomeIcon icon={faChromecast} />
            </div>
            {currentUser ? (
              <div className="currentCon">
                <div className="imgCon">
                  <img
                    src={currentUser.rest.profilePicture}
                    alt={currentUser.rest.name}
                    className="rounded-circle"
                  />
                  {/* {console.log(currentUser)} */}
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="dropdown-item" href="#">
                        {currentUser.rest.email}
                      </div>
                    </li>
                    <li>
                      <div className="dropdown-item" href="#">
                        {currentUser.rest.name}
                      </div>
                    </li>
                    <li>
                      <div className="dropdown-item" href="#">
                        sign out
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to={"/signin"}>
                <button type="button" className="btn btn-success">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
