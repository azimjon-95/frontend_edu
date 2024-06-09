import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/api";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from './IMGBaner.png'

import './Draft.css';
import { AuthContext } from "../../context/AuthContext";


function Draft() {
  const { setIsLoading } = useContext(AuthContext)

  const params = useParams();
  const [data, setData] = useState('');
  console.log("data: ", data)
  useEffect(() => {

    const getApi = async () => {
      setIsLoading(true)
      await axios
        .post(`certificate/check/${(params?.id)?.toUpperCase()}`)
        .then((certificateDrafted) => {
          // console.log(certificateDrafted)
          setData(certificateDrafted?.data)

          setTimeout(() => {
            setIsLoading(false)

          }, 1000);

        })
        .catch(err => {
          setIsLoading(false)
          console.log(err)
        })
    }
    getApi()

  }, [params, setIsLoading]);


  return (
    <div className="pdf_Cont">
      <div className="darft_container ">
        <div className="boxDarft">
          <Link to="/" className="main_pageLink">
            <FiArrowLeft /> Asosiy
          </Link>
          <i></i>
        </div>
        <div className="pdf_Box">

          <div className="pdf_main pdf-text">
            <p>© Yagona Buxgalteriya, 2024 Barcha huquqlar himoyalangan.</p>
          </div>

        </div>
      </div >
    </div>
  );

}

export default Draft;
