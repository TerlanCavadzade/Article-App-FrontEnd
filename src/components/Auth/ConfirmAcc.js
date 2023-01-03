import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";

import classes from "./AuthForm.module.css"

const ip = process.env.REACT_APP_BACKEND_IP

const ConfirmAcc = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const codeRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredCode = codeRef.current.value;

    axios.post(ip+"/confirm", {
        id,
        num: enteredCode,
    })
      .then(({data}) => {
        ctx.login(data._id, false, data.reviewer);
        navigate("/profile")
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <Card>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="code">Code:</label>
          <input ref={codeRef} type="text" id="code" placeholder="Code..." />
          <p>The Code Sent Your Email Account</p>
        </div>
        <div className={classes.actions}>
          <Button>Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default ConfirmAcc;
