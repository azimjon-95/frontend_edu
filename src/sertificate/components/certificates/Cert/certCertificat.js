import React, { useState, useContext, useEffect } from "react";
import './style.css';
import QRCode from "react-qr-code";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/api";

const CertCertificat = React.forwardRef((props, ref) => {
  const { URL } = useContext(AuthContext);
  const [reactId, setReactID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/certificate/checkaddindex/sert`);
        setReactID(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const {
    name,
    surname,
    id,
    pdf_class,
    prosent,
    givenDate
  } = props.obj;

  return (
    <div className={`pdf_driver ${pdf_class}`}>
      <div className="certificat_Container" ref={ref}>
        <div className="containerEng">
          <h3 className="engID">{id}</h3>
          <h3 className="engIDed">{prosent}</h3>

          <div className="line">
            <h3>{name} {surname}</h3>
          </div>

          <div className="Box_QRCodeEn">
            <div className="QRCodeEnd">
              <QRCode value={`${URL}/check/${id ? id : reactId}`} />
            </div>
            <b> {givenDate}</b>
            <b>Berilgan vaqt sana</b>
          </div>


        </div>
      </div>
    </div>
  )

});
export default CertCertificat;
