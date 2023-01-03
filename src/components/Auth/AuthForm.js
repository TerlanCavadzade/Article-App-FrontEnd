import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";

import classes from "./AuthForm.module.css";

const ip = process.env.REACT_APP_BACKEND_IP

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();
  const reviewerCheckbox = useRef();
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInput.current.value.toLowerCase();
    const enteredPassword = passwordInput.current.value;

    setIsLoading(true);

    if (isLogin) {
      axios.post(`${ip}/login`, {
          password: enteredPassword,
          gmail: enteredEmail,
      })
        .then(({data}) => {
          setIsLoading(false);
          authCtx.login(data._id, data.admin, data.reviewer);
          if (data.confirmNum !== "confirmed") {
            authCtx.logout();
            navigate(`/confirm/${data._id}`);
          } else if (
            !data.name &&
            !data.googleScholarId &&
            !data.orcidId &&
            !data.researchGate
          ) {
            navigate("/profile");
          } else {
            navigate("/post");
          }
        })
        .catch((err) => alert(err.response.data.error));
    } else {
      const ifReviewer = reviewerCheckbox.current.checked;

      axios.post(`${ip}/register`, {
          password: enteredPassword,
          gmail: enteredEmail,
          reviewer: ifReviewer,
      })
        .then(({data}) => {
          setIsLoading(false);
          navigate(`/confirm/${data._id}`);
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Card>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInput} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordInput} type="password" id="password" required />
        </div>
        {!isLogin && (
          <div className={`${classes.control} ${classes.checkbox}`}>
            <input
              ref={reviewerCheckbox}
              type="checkbox"
              id="reviewer"
              name="reviewer"
              value={true}
            />
            <label htmlFor="reviewer">Sign Up As Reviewer</label>
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <Button>{isLogin ? "Login" : "Create Account"}</Button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
