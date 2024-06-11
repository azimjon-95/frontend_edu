import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/api";
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import Cert from '../../components/certificates/Sert/Cert';
import DipCertificat from '../../components/certificates/Dip/Dip';
import './Draft.css';
import { AuthContext } from "../../context/AuthContext";
import ReactToPrint from 'react-to-print';

function Draft() {
  const { setIsLoading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const componentRef = useRef();
  const { id } = useParams();  // Destructure the ID parameter from URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`certificate/check/${id}`);  // Use the ID parameter
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

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/" className="main_pageLink">
          <FiArrowLeft /> Asosiy sahifaga qaytish
        </Link>
      </div>
    );
  }

  if (!data) return null;

  const { lastname, firstname, other, givenDate, courseName, _id, prosent } = data || {};

  const PdfCertificate = () => {
    if (courseName === "dip") {
      return (
        <DipCertificat
          ref={componentRef}
          obj={{ lastname, firstname, other, courseName, prosent, id, givenDate }}
        />
      );
    } else if (courseName === "cert") {
      return (
        <Cert
          ref={componentRef}
          obj={{ lastname, firstname, other, courseName, prosent, id, givenDate }}
        />
      );
    }
    return null;
  };

  return (
    <div className="pdf_Cont">
      <div className="draft_container">
        <div className="boxDraft">
          <Link to="/" className="main_pageLink">
            <FiArrowLeft /> Asosiy
          </Link>
        </div>
        <div id="qrBarBox" className={`pdf_Box ${data ? 'show' : 'hide'}`}>

        </div>

        <ReactToPrint
          trigger={() => (
            <button style={{ margin: "auto" }} className="pdf_controllersRiht">
              <FiDownload />
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


// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "../../api/api";
// import { FiArrowLeft, FiDownload } from 'react-icons/fi';
// import Cert from '../../components/certificates/Cert/cert';
// import DipCertificat from '../../components/certificates/Dip/Dip';
// import './Draft.css';
// import { AuthContext } from "../../context/AuthContext";
// import ReactToPrint from 'react-to-print';

// function Draft() {
//   const { setIsLoading } = useContext(AuthContext);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const componentRef = useRef();
//   const { id } = useParams();  // Destructure the ID parameter from URL

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`certificate/check/${id}`);  // Use the ID parameter
//         setData(response.data);
//         setError(null);
//       } catch (error) {
//         setError("Error fetching certificate. Please try again.");
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, setIsLoading]);

//   if (!data && !error) return null;

//   const { name, lastname, firstname,other, givenDate, courseName, prosent } = data || {};

//   const PdfCertificate = () => {
//     if (courseName === "dip") {
//       return (
//         <DipCertificat
//           ref={componentRef}
//           obj={{ name, lastname, firstname,other, courseName, prosent, id, givenDate }}
//         />
//       );
//     } else if (courseName === "cert") {
//       return (
//         <Cert
//           ref={componentRef}
//           obj={{ name, lastname, firstname,other, courseName, prosent, id, givenDate }}
//         />
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="pdf_Cont">
//       <div className="draft_container">
//         <div className="boxDraft">
//           <Link to="/" className="main_pageLink">
//             <FiArrowLeft /> Asosiy
//           </Link>
//         </div>
//         {name} {lastname} firstname,other,
//         <div className={`pdf_Box ${data ? 'show' : 'hide'}`}>
//           {PdfCertificate()}
//         </div>
//         <ReactToPrint
//           trigger={() => (
//             <button className="pdf_controllers">
//               <FiDownload /> Yuklab olish
//             </button>
//           )}
//           content={() => componentRef.current}
//         />
//         <div className="pdf_main pdf-text">
//           <p>© Yagona Buxgalteriya, 2024 Barcha huquqlar himoyalangan.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Draft;


