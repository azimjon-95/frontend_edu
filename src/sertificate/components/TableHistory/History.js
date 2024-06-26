import React, { useEffect, useState, useRef, useMemo } from 'react';
import './style.css';
import axios from '../../api/api';
import ReactToPrint from 'react-to-print';
import { FiDownload } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import { Input } from 'antd'; // Import Ant Design Input component
import LoadingTruck from '../loading/LoadingTruck';
import Cert from '../certificates/Sert/Cert';
import DipCertificat from '../certificates/Dip/Dip';
import { Tabs } from "antd";

const { Search } = Input;

const History = () => {
    const componentRef = useRef();
    const [idD, setIdD] = useState("S0001");
    const [modal, setModal] = useState(false);
    const [deleteCertId, setDeleteCertId] = useState(null);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get("/certificate/all")
            .then((response) => setData(response?.data))
            .catch((err) => console.log(err));
    }, []);

    const filteredData = useMemo(() => {
        const lowercasedValue = searchQuery.toLowerCase();
        return data.filter(item =>
            item.firstname?.toLowerCase().includes(lowercasedValue) ||
            item.lastname?.toLowerCase().includes(lowercasedValue) ||
            item.other?.toLowerCase().includes(lowercasedValue) ||
            item.id?.toLowerCase().includes(lowercasedValue) ||
            item.courseName?.toLowerCase().includes(lowercasedValue)
        );
    }, [data, searchQuery]);

    const deleteCertificate = (id) => {
        if (id) {
            axios
                .delete(`/certificate/delete/${id}`)
                .then((response) => {
                    setData(prevData => prevData.filter(cert => cert._id !== id));
                    setModal(false);
                })
                .catch((err) => console.log(err));
        }
    };

    const checkID = (id) => {
        setIdD(id);
    };

    const TableRow = ({ obj }) => {
        const {
            firstname,
            lastname,
            other,
            givenDate,
            courseName,
            _id,
            id,
            prosent,
        } = obj;

        return (
            <tr key={_id}>
                <td>{id}</td>
                <td>{firstname} {lastname} {other}</td>


                <td>
                    <ReactToPrint
                        trigger={() => (
                            <button
                                onFocus={() => checkID(_id)}
                                className="driverTableBodyDelBtn driverTableBodyPDFBtn"
                            >
                                <FiDownload /><span>PDF</span>
                            </button>
                        )}
                        content={() => componentRef.current}
                    />
                </td>
                <td>
                    <button onClick={() => { setModal(true); setDeleteCertId(_id); }} className='driverTableBodyDelBtn'>
                        <BsFillTrashFill /><span> O'chirish</span>
                    </button>
                </td>
                <td style={{ display: "none" }}>
                    {courseName === "cert" && _id === idD ? (
                        <Cert
                            ref={componentRef}
                            obj={{ idD: _id, id, prosent, firstname, lastname, courseName, other: other, givenDate }}
                        />
                    ) : courseName === "dip" && _id === idD ? (
                        <DipCertificat
                            ref={componentRef}
                            obj={{ idD: idD, id, prosent, firstname, lastname, courseName, other: other, givenDate }}
                        />
                    ) : null}
                </td>
            </tr>
        );
    };

    return (
        <div className='allLicense'>
            <div className="allLicenseContainer">
                <div className="SearchBar">
                    <h1 className='allLicenseTitle'>O'quvchining Sertifikatlar Ro'yhati</h1>
                    <div>
                        <Search
                            placeholder="Qidirish"
                            allowClear
                            size="middle"
                            onChange={e => setSearchQuery(e.target.value)}
                            width={100}
                        />
                    </div>
                </div>
                <div className='driverTableContainer'>
                    {filteredData.length > 0 ? (
                        <>
                            <Tabs defaultActiveKey="0">
                                <Tabs.TabPane tab="Sertifikatlar" key="0">
                                    <table className='driverTable'>
                                        <thead className='driverTableHead'>
                                            <tr>
                                                <th>ID</th>
                                                <th>FIO</th>
                                                <th>PDF chiqarish</th>
                                                <th>O'chirish</th>
                                            </tr>
                                        </thead>
                                        <tbody className='driverTableBody'>
                                            {filteredData.filter(item => item.courseName === "cert").map(item => (
                                                <TableRow key={item._id} obj={item} />
                                            ))}
                                        </tbody>
                                    </table>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Diplomlar" key="1">
                                    <table className='driverTable'>
                                        <thead className='driverTableHead'>
                                            <tr>
                                                <th>ID</th>
                                                <th>FIO</th>
                                                <th>PDF chiqarish</th>
                                                <th>O'chirish</th>
                                            </tr>
                                        </thead>
                                        <tbody className='driverTableBody'>
                                            {filteredData.filter(item => item.courseName === "dip").map(item => (
                                                <TableRow key={item._id} obj={item} />
                                            ))}
                                        </tbody>
                                    </table>
                                </Tabs.TabPane>
                            </Tabs>
                            {modal && (
                                <div className='driverModalMain'>
                                    <div className="driverModalContainer">
                                        <BsFillTrashFill />
                                        <h3>Ishinchingiz komilmi?</h3>
                                        <div>
                                            <button onClick={() => deleteCertificate(deleteCertId)}>Ha</button>
                                            <button onClick={() => setModal(false)}>Yo'q</button>
                                        </div>
                                    </div>
                                    <div onClick={() => setModal(false)} className="driverModalHide"></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <LoadingTruck />
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;












// import React, { useEffect, useState, useRef } from 'react';
// import './style.css';
// import axios from '../../api/api';
// import ReactToPrint from 'react-to-print';
// import { FiDownload } from 'react-icons/fi';
// import { BsFillTrashFill } from 'react-icons/bs';
// import LoadingTruck from '../loading/LoadingTruck';
// import Cert from '../certificates/Cert/cert';
// import DipCertificat from '../certificates/Dip/Dip';

// const History = () => {
//     const componentRef = useRef();
//     const [idD, setIdD] = useState("S0001");
//     const [modal, setModal] = useState(false);
//     const [deleteCertId, setDeleteCertId] = useState(null);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         axios
//             .get("/certificate/all")
//             .then((response) => setData(response?.data))
//             .catch((err) => console.log(err));
//     }, []);

//     const deleteCertificate = (id) => {
//         if (id) {
//             axios
//                 .delete(`/certificate/delete/${id}`)
//                 .then((response) => {
//                     setData(prevData => prevData.filter(cert => cert._id !== id));
//                     setModal(false);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     };

//     const checkID = (id) => {
//         setIdD(id);
//     };

//     const filteredData = data?.filter(el => el.courseName)?.reverse();

//     const TableFilterCertificate = ({ obj }) => {
//         const {
//             name,
//             lastname,
//             other,
//             givenDate,
//             courseName,
//             _id,
//             id,
//             prosent,
//         } = obj;

//         if (courseName === "cert" && _id === idD) {
//             return (
//                 <Cert
//                     ref={componentRef}
//                     obj={{ idD: _id, id, prosent, name, lastname, courseName, other: other, givenDate }}
//                 />
//             );
//         } else if (courseName === "dip" && _id === idD) {
//             return (
//                 <DipCertificat
//                     ref={componentRef}
//                     obj={{ idD: idD, id, prosent, name, lastname, courseName, other: other, givenDate }}
//                 />
//             );
//         }
//         return null;
//     };

//     return (
//         <div className='allLicense'>
//             <div className="allLicenseContainer">
//                 <div className="SearchBar">
//                     <h1 className='allLicenseTitle'>O'quvchining Sertifikatlar Ro'yhati</h1>
//                 </div>
//                 <div className='driverTableContainer'>
//                     {data.length > 0 ? (
//                         <>
//                             <table className='driverTable'>
//                                 <thead className='driverTableHead'>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>FISH</th>
//                                         <th>Catigory</th>
//                                         <th>Teacher name</th>
//                                         <th>PDF chiqarish</th>
//                                         <th>O'chirish</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className='driverTableBody'>
//                                     {filteredData.map(({ _id, id, name, lastname, courseName, other, prosent, givenDate }) => (
//                                         !name.includes("Mavjud") && (
//                                             <tr key={_id}>
//                                                 <td>{id}</td>
//                                                 <td>{name} {lastname}</td>
//                                                 <td>{courseName === "cert" ? "Sertifikat" : "Diplom"}</td>

//                                                 <td>{other}</td>
//                                                 <td>
//                                                     <ReactToPrint
//                                                         trigger={() => (
//                                                             <button
//                                                                 onFocus={() => checkID(_id)}
//                                                                 className="driverTableBodyDelBtn driverTableBodyPDFBtn"
//                                                             >
//                                                                 <FiDownload /><span>PDF</span>
//                                                             </button>
//                                                         )}
//                                                         content={() => componentRef.current}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <button onClick={() => { setModal(true); setDeleteCertId(_id); }} className='driverTableBodyDelBtn'>
//                                                         <BsFillTrashFill /><span> O'chirish</span>
//                                                     </button>
//                                                 </td>
//                                                 <td style={{ display: "none" }}>
//                                                     <TableFilterCertificate obj={{ idD, _id, id, name, lastname, courseName, other, prosent, givenDate }} />
//                                                 </td>
//                                             </tr>
//                                         )
//                                     ))}
//                                 </tbody>
//                             </table>
//                             {modal && (
//                                 <div className='driverModalMain'>
//                                     <div className="driverModalContainer">
//                                         <BsFillTrashFill />
//                                         <h3>Ishinchingiz komilmi?</h3>
//                                         <div>
//                                             <button onClick={() => deleteCertificate(deleteCertId)}>Ha</button>
//                                             <button onClick={() => setModal(false)}>Yo'q</button>
//                                         </div>
//                                     </div>
//                                     <div onClick={() => setModal(false)} className="driverModalHide"></div>
//                                 </div>
//                             )}
//                         </>
//                     ) : (
//                         <LoadingTruck />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default History;
