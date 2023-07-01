import React, { useEffect, useState } from "react";
import Layout from "./../Layout/Layout";
import { useNavigate } from "react-router-dom";
import "./spinner.css";

const Spinner = ({ path, redirectMessage }) => {
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();

  console.log(counter);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    if (counter === 0) {
      return navigate(path || "/login");
    }

    return () => clearInterval(timer);
  }, [counter, navigate, path]);

  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center spinner-box align-items-center">
        <div className="spinner-text">{`${redirectMessage}  ${counter}`}</div>
        <div className="spinner-border spinner" role="status">
          <span className="sr-only" />
        </div>
      </div>
    </Layout>
  );
};

export default Spinner;
