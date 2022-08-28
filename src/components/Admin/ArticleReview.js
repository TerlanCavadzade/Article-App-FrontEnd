import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./ArticleReview.module.css";

const ArticleReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState();
  const [aboutFile, setAboutFile] = useState();

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    await fetch(`http://192.168.1.105:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviewList);
        setAboutFile(data.foundFile);
      });
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const submitHandler = (status) => {
    fetch(`http://192.168.1.105:3000/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data);
        navigate("/adminPanel");
      });
  };

  const downloadButtonHandler = () => {
    window.open(`http://192.168.1.105:3000/pdf/${id}`);
  };
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
              <button
                onClick={() => {
                  submitHandler("Rejected");
                }}
              >
                Reject
              </button>
              <button
                onClick={() => {
                  submitHandler("Accepted");
                }}
              >
                Accept
              </button>
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
