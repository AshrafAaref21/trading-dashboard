import dayjs from "dayjs";

export function toDate(days) {
  // Create a date starting from 1970-01-01 and add the given number of days
  return dayjs("1970-01-01").add(days, "day").format("YYYY-MM-DD");
}

export function cumulativeSum(arr) {
  let cumSum = 0;
  return arr.map((value) => (cumSum += value));
}

export function filterObjectByDateRange(data, startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const newObj = {};
  console.log("dates", startDate, endDate);

  if (data) {
    Object.keys(data).map((key) => {
      newObj[key] = [];
    });
  }

  data.date.map((date, index) => {
    const itemDate = dayjs(date);
    if (itemDate >= start && itemDate <= end) {
      newObj.date = [...newObj.date, itemDate.format("YYYY-MM-DD")];
      Object.keys(newObj).map((key) => {
        if (key === "date") return;
        newObj[key] = [...newObj[key], data[key][index]];
      });
    }
  });

  // Return a new object with filtered data
  return newObj;
}

// Example usage
const data = {
  date: ["2023-01-01", "2023-01-15", "2023-02-01"],
  wins: [10, 20, 30],
};

const filteredData = filterObjectByDateRange(data, "2023-01-01", "2023-01-31");
console.log(filteredData);
// Output: { date: ['2023-01-01', '2023-01-15'], wins: [10, 20] }
