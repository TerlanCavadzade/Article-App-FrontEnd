import classes from "./AllArticleList.module.css";

import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from "../UI/Table";
import UserListModal from "../Modal/UserListModal";
import UserProfileModal from "../Modal/UserProfileModal";
import Button from "../UI/Button";

const ip = process.env.REACT_APP_BACKEND_IP;

const AllArticleList = () => {
  const [articleData, setArticleData] = useState([]);
  const [reviewerList, setReviewerList] = useState([]);

  const [articleId, setArticleId] = useState("");
  const [userId, setUserId] = useState("");

  const [view, setView] = useState(false);
  const [profileView, setProfileView] = useState(false);

  const [rerender, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios(`${ip}/articles`).then((res) => {
      setArticleData(res.data);
    });
    axios(`${ip}/reviewers`).then((res) => {
      setReviewerList(res.data);
    });
  }, [rerender]);

  const buttonClickHandler = async (id) => {
    setView(true);
    await setArticleId(id);
  };

  const nameClickHandler = (id) => {
    setProfileView(true);
    setUserId(id);
  };

  const closeProfileModal = () => {
    setProfileView(false);
  };

  const onConfirm = () => {
    setView(false);
    forceUpdate();
  };

  const submitHandler = (status, id) => {
    axios
      .put(`${ip}/submit`, {
        status,
        id,
      })
      .then((res) => alert(res.data));
  };

  var pending = articleData.filter((e) => e.status === "Pending");
  var reviewed = articleData.filter((e) => e.status === "Reviewed");
  var accepted = articleData.filter((e) => e.status === "Accepted");
  var rejected = articleData.filter((e) => e.status === "Rejected");
  var sentReviewer = articleData.filter((e) => e.status === "Sent To Reviewer");

  return (
    <>
      {view && (
        <UserListModal
          articleId={articleId}
          reviewerList={reviewerList}
          onConfirm={onConfirm}
        />
      )}
      {profileView && (
        <UserProfileModal userId={userId} onConfirm={closeProfileModal} />
      )}
      {pending[0] && (
        <>
          <h1 className={classes.headerText}>Recent Articles</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>File Name</th>
                <th>Send</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pending.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => {
                      nameClickHandler(data.senderId);
                    }}
                  >
                    {data.name}
                  </td>
                  <td>
                    <Link to={data._id}>{data.fileName}</Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        buttonClickHandler(data._id);
                      }}
                    >
                      Send
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        submitHandler("Rejected", data._id);
                      }}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {sentReviewer[0] && (
        <>
          <h1 className={classes.headerText}>Sent To Reviewer</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>File Name</th>
                <th>Read</th>
                <th>Send</th>
              </tr>
            </thead>
            <tbody>
              {sentReviewer.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => {
                      nameClickHandler(data.senderId);
                    }}
                  >
                    {data.name}
                  </td>
                  <td>{data.fileName}</td>
                  <td>
                    <Link to={data._id}>
                      <Button>Read</Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        buttonClickHandler(data._id);
                      }}
                    >
                      Send
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {reviewed[0] && (
        <>
          <h1 className={classes.headerText}>Reviewed Articles</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>File Name</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {reviewed.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => {
                      nameClickHandler(data.senderId);
                    }}
                  >
                    {data.name}
                  </td>
                  <td>{data.fileName}</td>
                  <td>
                    <Link to={data._id}>
                      <Button>Read</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {accepted[0] && (
        <>
          <h1 className={classes.headerText}>Accepted Articles</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>File Name</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {accepted.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => {
                      nameClickHandler(data.senderId);
                    }}
                  >
                    {data.name}
                  </td>
                  <td>{data.fileName}</td>
                  <td>
                    <Link to={data._id}>
                      <Button>Read</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {rejected[0] && (
        <>
          <h1 className={classes.headerText}>Rejected Articles</h1>
          <Table>
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>File Name</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {rejected.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => {
                      nameClickHandler(data.senderId);
                    }}
                  >
                    {data.name}
                  </td>
                  <td>{data.fileName}</td>
                  <td>
                    <Link to={data._id}>
                      <Button>Read</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AllArticleList;
