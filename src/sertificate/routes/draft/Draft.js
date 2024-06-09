import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/api";
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import CertCertificat from '../../components/certificates/Cert/certCertificat';
import DipCertificat from '../../components/certificates/Dip/Dip';
import './Draft.css';
import { AuthContext } from "../../context/AuthContext";
import ReactToPrint from 'react-to-print';

function Draft() {
  const { setIsLoading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`certificate/check/${params}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching certificate. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params, setIsLoading]);

  if (!data && !error) return null;

  const {
    name,
    surname,
    teachername,
    givenDate,
    courseName,
    _id,
    id,
    prosent,
  } = data || {};

  return (
    <div className="pdf_Cont">
      <div className="draft_container">
        <div className="boxDraft">
          <Link to="/" className="main_pageLink">
            <FiArrowLeft /> Asosiy
          </Link>
        </div>
        <div className="pdf_Box">
          {courseName === "cert" && _id ? (
            <CertCertificat
              ref={componentRef}
              obj={{ idD: _id, id, prosent, name, surname, courseName, teacherName: teachername, givenDate }}
            />
          ) : courseName === "dip" && _id ? (
            <DipCertificat
              ref={componentRef}
              obj={{ idD: _id, id, prosent, name, surname, courseName, teacherName: teachername, givenDate }}
            />
          ) : null}
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="driverTableBodyDelBtn driverTableBodyPDFBtn">
              <FiDownload /><span>PDF</span>
            </button>
          )}
          content={() => componentRef.current}
        />
        <div className="pdf_main pdf-text">
          <p>© Yagona Buxgalteriya, 2024 Barcha huquqlar himoyalangan.</p>
        </div>

      </div>
    </div>
  );
}

export default Draft;
