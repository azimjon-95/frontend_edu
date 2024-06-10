import React, { useContext } from "react";
import './style.css';
import QRCode from "react-qr-code";
import { AuthContext } from "../../../context/AuthContext";
import logo from './buxreds.png'

const CertCertificat = React.forwardRef((props, ref) => {
  const { URL } = useContext(AuthContext);

  const {
    firstname,
    lastname,
    other,
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
            <h3>{lastname} {firstname} {other}</h3>
          </div>


          <div className="soat">
            96
          </div>

          <div className="Box_QRCodeEn">
            <div className="QRCodeEnd">
              <QRCode value={`${URL}/check/${id}`} />
            </div>
            <b> {givenDate}</b>
            <b>Berilgan vaqt sana</b>
          </div>
          <img className="imgLogo" width={280} src={logo} alt="" />

        </div>
      </div>
    </div>
  )

});
export default CertCertificat;
