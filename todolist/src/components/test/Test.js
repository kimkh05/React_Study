import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./style";

const Test = () => {
  const [data, setData] = useState("");
  console.log(data);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://3.36.161.36/taxi-pot/2",
    })
      .then((res) => {
        console.log(res);
        setData(res.data);
        /* setAll(res.data.all); */
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>{data.title}</div>
      <h1>{data.place}</h1>
      <p>{data.target}</p>
    </>
  );
};

export default Test;
