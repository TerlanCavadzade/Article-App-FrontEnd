import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Table from "../UI/Table";

import classes from "./Articles.module.css";

const ip = process.env.REACT_APP_BACKEND_IP


const Articles = () => {
  const ctx = useContext(AuthContext);
  const [articleData, setArticleData] = useState([]);
  const { token } = ctx;
  useEffect(() => {
    axios(`${ip}/review/${token}`)
      .then(({data}) => {
        setArticleData(data);
      });
  }, [token]);

  let articles = articleData.filter(
    (data) => data.status === "Sent To Reviewer"
  );


  return (
    <>
      {articleData[0] && (
        <Table>
          <thead>
            <tr>
              <th>Article Name</th>
              <th>Write Review</th>
            </tr>
          </thead>
          <tbody>
            {articles &&
              articles.map((data) => (
                <tr key={data._id}>
                  <td>{data.fileName}</td>
                  <td>
                    <Link className={classes.link} to={data._id}>
                      Write Review
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {!articleData[0] && (
        <h1 style={{ textAlign: "center" }}>Articles Not Found</h1>
      )}
    </>
  );
};

export default Articles;
