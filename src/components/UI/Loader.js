import classes from "./Loader.module.css";

import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className={classes.container}>
      <CircularProgress color="warning" />
    </div>
  );
};

export default Loader;
