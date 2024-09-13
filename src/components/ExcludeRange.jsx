import dayjs from "dayjs";
import { useState } from "react";
import { useDataContext } from "../context/DataContext";
import { Button, Checkbox, Slider } from "antd";

function ExcludeRange() {
  const {
    data,
    setData,
    chartData,
    setChartData,
    isFilterEnabled,
    setIsFilterEnabled,
  } = useDataContext();
  const startDate = dayjs(chartData.date[0]).unix();
  const endDate = dayjs(chartData.date[chartData.date.length - 1]).unix();

  console.log("chartData.date[-1]", chartData.date[chartData.date.length - 1]);

  const [range, setRange] = useState([startDate, endDate]);

  const handleCheckboxChange = (e) => {
    setIsFilterEnabled(e.target.checked);
  };

  const handleSliderChange = (values) => {
    setRange(values);
  };
  function handleClickFilter() {
    const newObj = {};

    Object.keys(chartData).map((key) => {
      newObj[key] = [];
    });

    chartData.date.map((date, index) => {
      const itemDate = dayjs(date);
      if (
        !(itemDate >= dayjs.unix(range[0]) && itemDate <= dayjs.unix(range[1]))
      ) {
        Object.keys(newObj).map((key) => {
          newObj[key] = [...newObj[key], chartData[key][index]];
        });
      }
    });

    setChartData(newObj);

    // const newData = {};

    // Object.keys(data).map((key) => {
    //   newData[key] = [];
    // });

    // data.date.map((date, index) => {
    //   const itemDate = dayjs(date);
    //   if (
    //     !(itemDate >= dayjs.unix(range[0]) && itemDate <= dayjs.unix(range[1]))
    //   ) {
    //     Object.keys(newData).map((key) => {
    //       newData[key] = [...newData[key], data[key][index]];
    //     });
    //   }
    // });

    // setData(newData);
  }

  return (
    <div style={{ marginTop: "10px", padding: "0 100px" }}>
      <div>
        <Checkbox onChange={handleCheckboxChange} checked={isFilterEnabled}>
          Enable Date Range Filter
        </Checkbox>
        {isFilterEnabled && (
          <Button
            // danger
            // type="dashed"
            shape="round"
            onClick={handleClickFilter}
            style={{ marginLeft: "3rem" }}
          >
            Exclude Range
          </Button>
        )}
      </div>
      {isFilterEnabled && (
        <div>
          <Slider
            range
            value={range}
            min={startDate}
            max={endDate}
            onChange={handleSliderChange}
            tipFormatter={(value) => dayjs.unix(value).format("YYYY-MM-DD")}
            style={{ marginLeft: "50px" }}
          />
        </div>
      )}
    </div>
  );
}

export default ExcludeRange;
