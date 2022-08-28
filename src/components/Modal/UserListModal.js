import reactDom from "react-dom";
import Card from "../UI/Card";
import Backdrop from "./Backdrop";
import classes from "./UserListModal.module.css";

const UserList = (props) => {
  const { onConfirm, articleId, reviewerList } = props;
  const buttonClickHandler = (id) => {
    onConfirm();
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        reviewerId: id,
      }),
    })
      .then((res) => {
        if (res.ok) res.json();
        else {
          return res.json().then((data) => {
            if (data && data.error) {
              var err = data.error;
            }
            throw new Error(err);
          });
        }
      })
      .then((data) => {})
      .catch(err=>alert(err))
  };
  return (
    <Card className={classes.modal}>
      <h1>Reviewer List</h1>
      <div className={classes.container}>
        <ul>
          {reviewerList.map((data) => (
            <li key={data._id}>
              {data.gmail}{" "}
              <button
                onClick={() => {
                  buttonClickHandler(data._id);
                }}
              >
                Send
              </button>
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
