import reactDom from "react-dom";
import Card from "../UI/Card";
import Backdrop from "./Backdrop";
import classes from "./UserListModal.module.css";

import axios from "axios"
import Button from "../UI/Button";

const ip = process.env.REACT_APP_BACKEND_IP


const UserList = (props) => {
  const { onConfirm, articleId, reviewerList } = props;
  const buttonClickHandler = (id) => {
    onConfirm();
    axios.post(`${ip}/send`, {
        articleId,
        reviewerId: id,
    })
      .catch(err=>alert(err.response.data.error))
  };
  return (
    <Card className={classes.modal}>
      <h1>Reviewer List</h1>
      <div className={classes.container}>
        <ul>
          {reviewerList.map((data) => (
            <li key={data._id}>
              {data.gmail}{" "}
              <Button
                onClick={() => {
                  buttonClickHandler(data._id);
                }}
              >
                Send
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const UserListModal = (props) => {
  const { onConfirm, reviewerList, articleId } = props;
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <UserList
          articleId={articleId}
          onConfirm={onConfirm}
          reviewerList={reviewerList}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default UserListModal;
