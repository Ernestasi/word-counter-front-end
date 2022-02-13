import axios from "axios";

const BACK_END_URL = "http://localhost:8080";

let Axios =  axios.create({
  baseURL: BACK_END_URL,
  headers: {
    "Content-type": "application/json",
  }
});

export default Axios;