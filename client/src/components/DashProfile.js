import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileLoadProgress, setImageFileLoadProgress] = useState(null);
  const [imageFileLoadError, setImageFileLoadError] = useState(null);
  const filePicChoose = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile]);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileLoadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileLoadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileLoadError(
          "Could not upload image. File must be less than 2MB."
        );
        setImageFileLoadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="DashProfile">
      <h2>Profile</h2>
      <input
        className="uploadpic"
        hidden
        type="file"
        accept="image/*"
        id="uploadpic"
        onChange={handleChange}
        ref={filePicChoose}
      />

      {imageFileLoadProgress && (
        <CircularProgressbar
          value={imageFileLoadProgress || 0}
          text={`${imageFileLoadProgress}%`}
          strokeWidth={10}
          styles={{
            root: {
              width: "50px",
              height: "50px",
              // position: "absolute",
              // top: 0,
              // left: 0,
            },
            path: {
              stroke: `rgba(62, 152, 199, ${imageFileLoadProgress / 100})`,
            },
          }}
        />
      )}
      <div
        className="profileImg"
        onClick={() => {
          filePicChoose.current.click();
        }}
      >
        <img src={imageFileUrl || currentUser.rest.profilePicture} alt="pic" />
      </div>

      {imageFileLoadError && (
        <div className="conOfDeleteandLogout">{imageFileLoadError}</div>
      )}

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
  );
};

export default DashProfile;
