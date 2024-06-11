import React, { useEffect, useState, useRef } from "react";
import "./HeroBanner.css";
import { FiSearch } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import axios from '../../api/api'
import hero_banner from "../../assets/main/bg.png";
import Header from "../header/Header";
import ReactToPrint from 'react-to-print';
import { FiDownload } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import Cert from '../certificates/Sert/Cert';
import DipCertificat from '../certificates/Dip/Dip';

const HeroBanner = () => {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [idD, setIdD] = useState("S0001");

  const checkID = (id) => {
    setIdD(id);
  };
  useEffect(() => {
    if (value.length) {
      axios
        .get(`/certificate/all`)
        .then(response => setData(response?.data))
        .catch((err) => console.log(err));
      return;
    } else {
      return;
    }
  }, [value]);
  let searchedData = data.filter(i => i?.id === value);
  sessionStorage.setItem("data", JSON.stringify(searchedData))


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
      <table border={1} className="SearchPDF" key={_id}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Familiya Ism Otasining ismi</th>
            <th>Yuklab olish</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{lastname} {firstname} {other}</td>
            <td>
              <ReactToPrint
                trigger={() => (
                  <button
                    onFocus={() => checkID(_id)}
                    className="driverTab"
                  >
                    <FiDownload /><span>PDF</span>
                  </button>
                )}
                content={() => componentRef.current}
              />
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
        </tbody>
      </table>
    );
  };
  return (
    <div className="bannerHero">
      <Header />

      <div className="heroBanner">
        <div className="heroBanner-left">
          <h1 className="heroBanner-title">Yagona Buxgalteriya rasmiy sertifikatlari</h1>
          <div className="imgBanerMobile">
            <img
              src={hero_banner}
              alt="heroBanner-images"
            />
          </div>
          <div className="checker_wrapper">
            <input
              id="certificate_number"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="ID raqamingizni kiriting"
              className="check_certificate-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            // onBlur={() => setSearch(true)}

            />
            <FiSearch />
          </div>
          {value ?
            <div className="studentResult">
              {searchedData.length ? (
                searchedData.map(i => (
                  <div key={i}>
                    <TableRow key={i._id} obj={i} />
                  </div>
                ))
              ) : (
                <div className="Loadin">
                  <h3 className="Load">Loading<span className="Load_1">.</span><span className="Load_2">.</span><span className="Load_3">.</span></h3>
                </div>
              )}
            </div>
            :
            <div className="imgBox">
              <img src="https://media2.giphy.com/media/IzWnWcZHgGVaR3vglp/giphy.gif?cid=ecf05e47nya1o7uxhopxiaahv84cb3dphxwifktoy8ut9tci&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
            </div>
          }
        </div>

        <div className="imgBaner">
          <img
            src={hero_banner}
            alt="heroBanner-images"
          />
        </div>

      </div >

      <Outlet />
    </div>

  );
};
export default HeroBanner;
