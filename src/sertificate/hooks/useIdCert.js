import { useState, useEffect } from "react";
import axios from "../api/api";

const useIdCss = (route) => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("/certificate/cert")
      .then((response) => {
        setData(response?.data)
      })
      .catch((err) => console.log(err));

  }, [route]);
  if (data?.length < 10) {
    return ["C000" + (data.length + 1)];
  } else if (data?.length <= 99) {
    return ["C00" + (data.length + 1)];
  } else if (data?.length <= 999) {
    return ["C0" + (data.length + 1)];
  } else {
    return "C" + [data?.length + 1];
  }
};

export { useIdCss };
