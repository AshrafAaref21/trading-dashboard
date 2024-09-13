import Plot from "react-plotly.js";
import { cumulativeSum } from "../utils/helper";
import { Button, Switch, Tooltip } from "antd";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import { useState } from "react";

function ProfitCumChart() {
  const { data, chartData, setChartData } = useDataContext();
  const [toggle, setToggle] = useState(false);
  console.log("toggle", toggle);

  const { layoutRef, onChangeLayout, handleReset, handleRelayout } =
    useRelayout(
      {
        width: 900,
        height: 400,
        xaxis: {
          title: "Date",
        },
        yaxis: {
          title: { text: "Profit Cumulative", standoff: 30 },
        },
        legend: {
          x: -0.2,
          y: 1.5,
        },
        showlegend: true,
        type: "lines+markers",
        mode: "markers",
      },
      data,
      setChartData
    );

  const transformedData = [
    {
      x: chartData.date, // The x-axis values
      y: cumulativeSum(chartData.profit_short), // The y-values for 'profit_short'
      mode: "lines",
      name: "Short",
    },
    {
      x: chartData.date,
      y: cumulativeSum(chartData.profit_long),
      mode: "lines",
      name: "Long",
    },
    {
      x: chartData.date,
      y: cumulativeSum(chartData.profit_total),
      mode: "lines",
      name: "Total",
    },
  ];

  return (
    <>
      <div style={{ marginTop: "0", marginBottom: "-2.6rem" }}>
        {/* <Button
          size="large"
          shape="circle"
          type="primary"
          style={{ padding: "6px", zIndex: "9999" }}
          onClick={handleRelayout}
        >
          Apply
        </Button> */}
        <Tooltip title="Area Only" placement="top">
          <Switch
            // size="small"
            className="large-switch"
            style={{ zIndex: "9999" }}
            checked={toggle} // Controls the switch state
            onChange={(state) => setToggle(state)} // Handles the state change
          />
        </Tooltip>
        <Tooltip title="Reset Changes" placement="top">
          <Button
            style={{
              marginLeft: "1.6rem",
              zIndex: "9999",
              padding: "6px",
            }}
            danger
            size="large"
            shape="circle"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Tooltip>
      </div>
      <Plot
        data={transformedData}
        layout={{
          width: 900,
          height: 400,
          xaxis: {
            title: "Date",
          },
          yaxis: {
            title: { text: "Profit Cumulative", standoff: 30 },
          },
          legend: {
            x: -0.2,
            y: 1.5,
          },
          showlegend: true,
          type: "lines+markers",
          mode: "markers",
          dragmode: "pan",
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        onRelayout={(layout) => {
          toggle && onChangeLayout(layout);
        }}
      />
    </>
  );
}

export default ProfitCumChart;
