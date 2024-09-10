import axios from "axios";

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
    console.log("Success:", response.data);
    onSucess();
  } catch (error) {
    console.error("Error:", error);
    onFailure();
  }
}
