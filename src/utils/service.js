import axios from "axios";
import { toDate } from "./helper";

const transformData = (arr) => {
  return arr.reduce((acc, { name, values }) => {
    name === "date" ? (acc[name] = values.map(toDate)) : (acc[name] = values); // Assign the array of values to the corresponding key
    return acc;
  }, {});
};

export default async function postData(
  data = {
    from_date: "2023-11-15",
    to_date: "2024-11-17",
    market: "PJMvirts",
    model: "v3.0.0",
    node: "miso",
  },
  onSucess = () => {},
  onFailure = (onSucess = () => {})
) {
  try {
    const response = await axios.post(
      "https://quantum-zero-bayfm.ondigitalocean.app/report",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const cols = response.data.columns;
    console.log("Success:", cols);
    console.log("Success:", transformData(cols));
    onSucess();
    return transformData(cols);
  } catch (error) {
    console.error("Error:", error);
    onFailure();
  }
}
