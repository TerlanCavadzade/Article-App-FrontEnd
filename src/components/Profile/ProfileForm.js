import axios from "axios";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import classes from "./ProfileForm.module.css";


const ip = process.env.REACT_APP_BACKEND_IP

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const scholarId = useRef();
  const researchGateLink = useRef();
  const orcidId = useRef();
  const nameRef = useRef();

  const ctx = useContext(AuthContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredScholarId = scholarId.current.value;
    const enteredResearchGate = researchGateLink.current.value;
    const enteredOrcidId = orcidId.current.value;
    const enteredName = nameRef.current.value;
    setIsLoading(true);
    axios.post(`${ip}/userprofile`, {
        id: ctx.token,
        googleScholarId: enteredScholarId,
        researchGate: enteredResearchGate,
        orcidId: enteredOrcidId,
        name: enteredName,
    })
      .then((_) => {
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name Surname</label>
        <input ref={nameRef} type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="scholarId">Google Scholar Id</label>
        <input ref={scholarId} type="text" id="scholarId" />
      </div>
      <div className={classes.control}>
        <label htmlFor="researchGate">Research Gate Link</label>
        <input ref={researchGateLink} type="text" id="researchGate" />
      </div>
      <div className={classes.control}>
        <label htmlFor="orcidId">Orcid Id</label>
        <input ref={orcidId} type="text" id="orcidId" />
      </div>
      <div className={classes.actions}>{!isLoading && <Button>Submit</Button>}</div>
    </form>
  );
};

export default ProfileForm;
