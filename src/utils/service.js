import axios from "axios";
import { toDate } from "./helper";
import dayjs from "dayjs";

const transformData = (arr) => {
  return arr.reduce((acc, { name, values }) => {
    name === "date" ? (acc[name] = values.map(toDate)) : (acc[name] = values); // Assign the array of values to the corresponding key
    return acc;
  }, {});
};

export default async function postData(
  data = {
    from_date: "2024-01-01",
    to_date: "2024-03-31",
    market: "PJMvirts",
    model: "v3.0.0",
    node: "miso",
  },
  setIsloading,
  setError
) {
  try {
    const response = await axios.post(
      "https://quantum-zero-3jgsl.ondigitalocean.app/report",
      {
        ...data,
        from_date: dayjs(data.dateRange[0]).format("YYYY-MM-DD"),
        to_date: dayjs(data.dateRange[1]).format("YYYY-MM-DD"),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const cols = response.data.columns;

    if (!transformData(cols).date.length) {
      throw Error("There's no data for this short time period.");
    }

    const newData = transformData(cols);
    newData["loss_count"] = newData.loss_count_long.map(
      (longValue, index) => longValue + newData.loss_count_short[index]
    );
    newData["win_count"] = newData.win_count_long.map(
      (longValue, index) => longValue + newData.win_count_short[index]
    );
    return newData;
  } catch (error) {
    setIsloading(false);
    if (error.status == 500) {
      setError({
        message:
          "The [market, model, node] combination cannot be retrieved (likely nonexistent).",
      });
    } else {
      setError({ message: `${error.content || error.message}` });
    }

    throw Error(error);
  }
}
