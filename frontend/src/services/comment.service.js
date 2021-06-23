import axios from "axios";
import apiConfig from "../config/api.config"

const BASE_URL = apiConfig.BASE_URL;

class CommentService {
    getAll() {
      return axios.get(BASE_URL + "/comments");
    }
  
    get(id) {
      return axios.get(`${BASE_URL}/comments/${id}`);
    }
  
    create(data) {
      return axios.post(BASE_URL + "/comments", data);
    }
  
    update(id, data) {
      return axios.put(`${BASE_URL}/comments/${id}`, data);
    }
  
    delete(id) {
      return axios.delete(`${BASE_URL}/comments/${id}`);
    }
  
    deleteAll() {
      return axios.delete(`${BASE_URL}/comments`);
    }
  
    findByCar(car_id) {
      return axios.get(`${BASE_URL}/comments?car=${car_id}`);
    }
  }
  
  export default new CommentService();