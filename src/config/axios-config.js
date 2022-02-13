import axios from "axios";

const BACK_END_URL = "https://word-counter-back.herokuapp.com/";

let Axios =  axios.create({
  baseURL: BACK_END_URL,
  headers: {
    "Content-type": "application/json",
  }
});

export default Axios;