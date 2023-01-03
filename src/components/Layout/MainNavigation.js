import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const {isAdmin,isLoggedIn,isReviewer} = ctx
  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Name</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth" className={classes.login}>Login</Link>
            </li>
          )}

          {!isAdmin &&isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {!isAdmin && isLoggedIn && (
            <li>
              <Link to="/post">Post Article</Link>
            </li>
          )}
          {isAdmin&&(
            <li>
              <Link to="/adminPanel">AdminPanel</Link>
            </li>
          )}
          {isReviewer && (
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Button onClick={logoutHandler}>Logout</Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
