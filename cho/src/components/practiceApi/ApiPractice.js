import React, { useState, useEffect } from "react";
import axios from "axios";

const ApiPractice = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.github.com/users/kimkh05",
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>API 연동 연습</h1>
      <div>Here is My gitHub followers_url : {data.followers_url}</div>
      <div>Here is My company : {data.company}</div>
      <div>Here is My name : {data.name}</div>
      <div>Here is My bio : {data.bio}</div>
    </>
  );
};
export default ApiPractice;
