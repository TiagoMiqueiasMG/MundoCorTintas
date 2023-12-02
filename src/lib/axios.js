import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7192/fretes",
});

export default api;
