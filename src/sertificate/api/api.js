import axios from "axios";
const mainUrl = axios.create({
  baseURL: "http://localhost:5000/"
  // baseURL: "https://edu-backend-rho.vercel.app/"
});
export default mainUrl;