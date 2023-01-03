import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./ReviewForm.module.css";

const ip = process.env.REACT_APP_BACKEND_IP

const ReviewForm = () => {
  const params = useParams();
  const { id } = params;
  const reviewRef = useRef();
  const navigate = useNavigate()

  const downloadButtonHandler = () => {
    window.open(`${ip}/pdf/${id}`);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredReview = reviewRef.current.value;
    axios.post(`${ip}/postreview`, {
        reviewText: enteredReview,
        articleId: id,
    })
      .then(() => {
        navigate("/articles")
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <Card>
      <div className={classes.actions}>
        <Button onClick={downloadButtonHandler}>Download File</Button>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="text">Your Review</label>
          <textarea ref={reviewRef} id="text"></textarea>
        </div>
        <div className={classes.actions}>
          <Button>Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default ReviewForm;
