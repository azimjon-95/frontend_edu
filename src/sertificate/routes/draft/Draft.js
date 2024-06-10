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
          setError("Certificate not found. Please check the ID and try again.");
        } else {
          setError("Error fetching certificate. Please try again.");
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
          <FiArrowLeft /> Go back to the main page
        </Link>
      </div>
    );
  }

  if (!data) return null;

  const { name, surname, teachername, givenDate, courseName, _id, prosent } = data || {};

  const PdfCertificate = () => {
    if (courseName === "dip") {
      return (
        <DipCertificat
          ref={componentRef}
          obj={{ name, surname, courseName, prosent, id, givenDate }}
        />
      );
    } else if (courseName === "cert") {
      return (
        <CertCertificat
          ref={componentRef}
          obj={{ name, surname, courseName, prosent, id, givenDate }}
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
        {id}
        <div className={`pdf_Box ${data ? 'show' : 'hide'}`}>
          <PdfCertificate />
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="pdf_controllers">
              <FiDownload /> Yuklab olish
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
// import CertCertificat from '../../components/certificates/Cert/certCertificat';
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

//   const { name, surname, givenDate, courseName, prosent } = data || {};

//   const PdfCertificate = () => {
//     if (courseName === "dip") {
//       return (
//         <DipCertificat
//           ref={componentRef}
//           obj={{ name, surname, courseName, prosent, id, givenDate }}
//         />
//       );
//     } else if (courseName === "cert") {
//       return (
//         <CertCertificat
//           ref={componentRef}
//           obj={{ name, surname, courseName, prosent, id, givenDate }}
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
//         {name} {surname}
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
