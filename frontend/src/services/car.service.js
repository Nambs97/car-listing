import axios from "axios";
import apiConfig from "../config/api.config"

const BASE_URL = apiConfig.BASE_URL;

class CarService {
    getAll() {
      return axios.get(BASE_URL + "/cars");
    }
  
    get(id) {
      return axios.get(`${BASE_URL}/cars/${id}`);
    }
  
    create(data) {
      return axios.post(BASE_URL + "/cars", data);
    }
  
    update(id, data) {
      return axios.put(`${BASE_URL}/cars/${id}`, data);
    }
  
    delete(id) {
      return axios.delete(`${BASE_URL}/cars/${id}`);
    }
  
    deleteAll() {
      return axios.delete(`${BASE_URL}/cars`);
    }
  
    findByTitle(title) {
      return axios.get(`${BASE_URL}/cars?title=${title}`);
    }

    findByDescription(description) {
        return axios.get(`${BASE_URL}/cars?description=${description}`);
    }

    findByTitleAndDescription(title, description) {
        return axios.get(`${BASE_URL}/cars?title=${title}&description=${description}`);
    }
  }
  
  export default new CarService();