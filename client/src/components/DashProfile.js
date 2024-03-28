import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="DashProfile">
        <h2>Profile</h2>
        <div className="profileImg">
          <img src={currentUser.rest.profilePicture} alt="pic" />
        </div>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              defaultValue={currentUser.rest.username}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              defaultValue={currentUser.rest.email}
            />
          </div>
          <button type="submit" className="btn">
            Update
          </button>
          <div className="conOfDeleteandLogout">
            <span>Delete Account</span>
            <span>Sign Out</span>
          </div>
        </form>
      </div>
    </>
  );
};
export default DashProfile;
