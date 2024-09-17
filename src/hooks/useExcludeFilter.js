import dayjs from "dayjs";
import { useDataContext } from "../context/DataContext";
import { useState } from "react";
import isBetween from "dayjs/plugin/isBetween"; // Import isBetween plugin

dayjs.extend(isBetween);

export function useExcludeFilter() {
  const {
    initialData,
    data,
    setData,
    chartData,
    setChartData,
    excludedRanges,
    setExcludedRanges,
  } = useDataContext();

  const startDate = dayjs(chartData.date[0]).unix();
  const endDate = dayjs(chartData.date[chartData.date.length - 1]).unix();

  const [range, setRange] = useState([startDate, endDate]);

  const handleSliderChange = (values) => {
    setRange(values);
  };

  function handleClickFilter() {
    const newChartData = {};

    Object.keys(chartData).map((key) => {
      newChartData[key] = [];
    });

    chartData.date.map((date, index) => {
      const itemDate = dayjs(date);
      const isExcluded =
        // itemDate.isBetween(range[0], range[1], null, "[]")
        itemDate >= dayjs.unix(range[0]).subtract(1, "days") &&
        itemDate <= dayjs.unix(range[1]);

      Object.keys(newChartData).map((key) => {
        if (key === "date") {
          newChartData[key] = [...newChartData[key], chartData[key][index]];
        } else {
          newChartData[key] = [
            ...newChartData[key],
            isExcluded ? null : chartData[key][index],
          ];
        }
      });
    });

    setChartData(newChartData);

    console.log("rangerange0", dayjs.unix(range[0]));
    const newData = {};
    Object.keys(data).map((key) => {
      newData[key] = [];
    });

    data.date.map((date, index) => {
      const itemDate = dayjs(date);
      const isExcluded =
        // itemDate.isBetween(dayjs.unix(range[0]), dayjs.unix(range[1]), null, "[]");
        itemDate >= dayjs.unix(range[0]).subtract(1, "days") &&
        itemDate <= dayjs.unix(range[1]);
      Object.keys(newData).map((key) => {
        if (key === "date") {
          newData[key] = [...newData[key], data[key][index]];
        } else {
          newData[key] = [
            ...newData[key],
            isExcluded ? null : data[key][index],
          ];
        }
      });
    });

    setData(newData);

    setExcludedRanges((state) => [
      ...state,
      range.map((val) => dayjs.unix(val).format("YYYY-MM-DD")),
    ]);
  }

  const isExcluded = (itemDate) => {
    return excludedRanges.some(([start, end]) => {
      const startDate = dayjs(start).unix();
      const endDate = dayjs(end).unix();
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  function handleResetExcluding() {
    const resetData = (originalData, initialData) => {
      const newData = {};

      Object.keys(originalData).forEach((key) => {
        newData[key] = [];
      });

      originalData.date.forEach((date, index) => {
        const itemDate = dayjs(date).unix();
        Object.keys(newData).forEach((key) => {
          if (key === "date") {
            // Always include the date
            newData[key].push(originalData[key][index]);
          } else {
            // If the date is in any excluded range, restore value from initialData
            const value = isExcluded(itemDate)
              ? initialData[key][index]
              : originalData[key][index];
            newData[key].push(value);
          }
        });
      });

      return newData;
    };

    const newChartData = resetData(chartData, initialData);
    const newData = resetData(data, initialData);

    // Update the state with reset values
    setChartData(newChartData);
    setData(newData);

    // setIsFilterEnabled(false);
  }

  function HandleIsFilter() {
    const isDateExcluded = (date) => {
      const itemDate = dayjs(date);
      return excludedRanges.some(([start, end]) => {
        const startDate = dayjs(start);
        const endDate = dayjs(end);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    };
    const newChartData = {};
    Object.keys(chartData).map((key) => {
      newChartData[key] = [];
    });

    chartData.date.map((date, index) => {
      const itemDate = dayjs(date);
      const isExcluded = isDateExcluded(itemDate);

      Object.keys(newChartData).map((key) => {
        if (key === "date") {
          newChartData[key] = [...newChartData[key], chartData[key][index]];
        } else {
          newChartData[key] = [
            ...newChartData[key],
            isExcluded ? null : chartData[key][index],
          ];
        }
      });
    });

    setChartData(newChartData);

    const newData = {};
    Object.keys(data).map((key) => {
      newData[key] = [];
    });

    data.date.map((date, index) => {
      const isDateExcluded = (date) => {
        const itemDate = dayjs(date);
        return excludedRanges.some(([start, end]) => {
          const startDate = dayjs(start);
          const endDate = dayjs(end);
          return itemDate.isBetween(startDate, endDate, null, "[]");
        });
      };
      const itemDate = dayjs(date);
      const isExcluded = isDateExcluded(itemDate);

      Object.keys(newData).map((key) => {
        if (key === "date") {
          newData[key] = [...newData[key], data[key][index]];
        } else {
          newData[key] = [
            ...newData[key],
            isExcluded ? null : data[key][index],
          ];
        }
      });
    });

    setData(newData);
  }

  return {
    range,
    HandleIsFilter,
    handleSliderChange,
    handleClickFilter,
    handleResetExcluding,
  };
}
