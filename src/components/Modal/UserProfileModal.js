import { useEffect, useState } from "react";
import reactDom from "react-dom";
import Card from "../UI/Card";
import Backdrop from "./Backdrop";
import classes from "./UserProfileModal.module.css";

import axios from "axios"

const ip = process.env.REACT_APP_BACKEND_IP


const UserProfile = (props) => {
  const { userId } = props;
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    axios.post(`${ip}/user`, {
        id: userId,
    })
      .then(({data}) => {
        setUserInfo(data);
      });
  }, [userId]);
  const {
    name = "Not Entered",
    gmail,
    googleScholarId = "not entered",
    orcidId = "not entered",
    researchGate = "not entered",
  } = userInfo;
  return (
    <Card className={classes.modal}>
      <h1>User Profile Information</h1>
      <div className={classes.container}>
        <div className={classes.imgContainer}>
        </div>
        <div className={classes.informationContainer}>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>Gmail:</span>
            <span>{gmail}</span>
          </div>
          <div>
            <span>GoogleScholarId:</span>
            <span>{googleScholarId}</span>
          </div>
          <div>
            <span>OracidId:</span>
            <span>{orcidId}</span>
          </div>
          <div>
            <span>ResearchGate:</span>
            <span>{researchGate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const UserProfileModal = (props) => {
  const { userId, onConfirm } = props;
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <UserProfile userId={userId} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default UserProfileModal;
