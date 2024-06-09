import { useState, useEffect } from "react";
import axios from "../api/api";

const useIdEng = (route) => {
  const [data, setData] = useState();

  // console.log(data)
  useEffect(() => {

    const getApi = async () => {
      await axios
        .get("/certificate/dip")
        .then((response) => {
          setData(response?.data)
        })
        .catch((err) => console.log(err));
    }

    getApi()
  }, [route]);
  if (data?.length < 10) {
    return ["D000" + (data.length + 1)];
  } else if (data?.length <= 99) {
    return ["D00" + (data.length + 1)];
  } else if (data?.length <= 999) {
    return ["D0" + (data.length + 1)];
  } else {
    return "D" + [data?.length + 1];
  }
};

export { useIdEng };
