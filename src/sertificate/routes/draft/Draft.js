import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/api";
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import './Draft.css';
import { AuthContext } from "../../context/AuthContext";
import ReactToPrint from 'react-to-print';

function Draft() {
  const { setIsLoading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`certificate/check/${id}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Sertifikat topilmadi. Iltimos, ID ni tekshirib qaytadan urinib ko'ring.");
        } else {
          setError("Sertifikatni olishda xatolik. Iltimos, qaytadan urinib ko'ring.");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setIsLoading]);


  return (
    <div className="pdf_Cont">
      <div className="draft_container">
        <div className="boxDraft">
          <Link to="/" className="main_pageLink">
            <FiArrowLeft /> Asosiy
          </Link>
        </div>
        <div id="qrBarBox" className={`pdf_Box ${data ? 'show' : 'hide'}`}>

          <p>Sertifikatni yuklab olish uchun quyidagi tugmani bosing.</p>


          <ReactToPrint
            trigger={() => (
              <button className="pdf_controllers">
                <FiDownload /> PDF
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>

        <div className="pdf_main pdf-text">
          <p>© Yagona Buxgalteriya, 2024 Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </div>
  );
}

export default Draft;
