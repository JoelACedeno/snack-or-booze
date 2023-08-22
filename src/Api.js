import axios from "axios";

const BASE_API_URL = "http://localhost:8000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async getSnacks() {
    const res = await axios.get(`${BASE_API_URL}/snacks`);
    console.log("Logging API snacks res:", res.data);
    return res.data;
  }

  static async getDrinks() {
    const res = await axios.get(`${BASE_API_URL}/drinks`);
    console.log("Logging API drinks res:", res.data);
    return res.data;
  }

  static async addSnack(newItem) {
    const res = await axios.post(`${BASE_API_URL}/snacks`, newItem);
    console.log("Logging API snacks res:", res.data);
    return res.data;
  }

  static async addDrink(newItem) {
    const res = await axios.post(`${BASE_API_URL}/drinks`, newItem);
    console.log("Logging API drinks res:", res.data);
    return res.data;
  }
}

export default SnackOrBoozeApi;
