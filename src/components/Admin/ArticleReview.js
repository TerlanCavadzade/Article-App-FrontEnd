import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./ArticleReview.module.css";

const ip = process.env.REACT_APP_BACKEND_IP;

const ArticleReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState();
  const [aboutFile, setAboutFile] = useState();

  const navigate = useNavigate();



  useEffect(() => {
    axios(`${ip}/reviews/${id}`).then(({ data }) => {
      setReviews(data.reviewList);
      setAboutFile(data.foundFile);
    });
  }, [id]);


  const submitHandler = (status) => {
    axios
      .put(`${ip}/submit`, {
        status,
        id,
      })
      .then(({ data }) => {
        alert(data);
        navigate("/adminPanel");
      });
  };

  const downloadButtonHandler = () => {
    window.open(`${ip}/pdf/${id}`);
  };

  console.log(reviews, aboutFile);

  return (
    <>
      {reviews && aboutFile ? (
        <Card>
          <p className={classes.about}>File Name: {aboutFile.fileName}</p>
          <p className={classes.about}>Status: {aboutFile.status}</p>
          <p className={classes.about}>Keywords: {aboutFile.keywords}</p>
          <p className={classes.about}>Sender Name: {aboutFile.name}</p>
          <p className={classes.about}>Abstract: {aboutFile.abstract}</p>
          <div className={`${classes.actions} ${classes.downloadButton}`}>
            <button onClick={downloadButtonHandler}>Download File</button>
          </div>
          <hr></hr>
          {reviews.map((data) => (
            <article className={classes.reviews} key={data._id}>
              {data.reviewText}
            </article>
          ))}
          {aboutFile.status === "Reviewed" && (
            <div className={classes.actions}>
              <Button
                onClick={() => {
                  submitHandler("Rejected");
                }}
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  submitHandler("Accepted");
                }}
              >
                Accept
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <h1 style={{ textAlign: "center" }}>Loading</h1>
      )}
    </>
  );
};

export default ArticleReview;
