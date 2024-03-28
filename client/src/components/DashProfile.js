import React, { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const filePicChoose = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile, imageFileUrl);

  return (
    <>
      <div className="DashProfile">
        <h2>Profile</h2>
        <input
          className="uploadpic "
          hidden
          type="file"
          accept="image/*"
          id="uploadpic"
          onChange={handleChange}
          ref={filePicChoose}
        />
        <div
          className="profileImg"
          onClick={() => {
            filePicChoose.current.click();
          }}
        >
          <img
            src={imageFileUrl || currentUser.rest.profilePicture}
            alt="pic"
          />
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

//////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const DashProfile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);

//   const handleChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <>
//       <div className="DashProfile">
//         <h2>Profile</h2>
//         <div className="profileImg">
//           <input
//             className="uploadpic"
//             type="file"
//             accept="image/*"
//             id="uploadpic"
//             onChange={handleChange}
//           />
//           <img
//             src={currentUser.rest.profilePicture}
//             alt="Profile"
//           />
//         </div>
//         <form>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               defaultValue={currentUser.rest.username}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               defaultValue={currentUser.rest.email}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Update
//           </button>
//         </form>
//         <div className="conOfDeleteandLogout">
//           <button className="btn btn-danger">Delete Account</button>
//           <button className="btn btn-secondary">Sign Out</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashProfile;
