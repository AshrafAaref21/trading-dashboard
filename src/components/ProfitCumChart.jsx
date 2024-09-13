import Plot from "react-plotly.js";
import { cumulativeSum } from "../utils/helper";
import { Button, Switch, Tooltip } from "antd";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import { useState } from "react";

function ProfitCumChart() {
  const { data, chartData, setChartData, toggle, setToggle } = useDataContext();

  const { layoutRef, onChangeLayout, handleReset, handleRelayout } =
    useRelayout(
      {
        width: 900,
        height: "100%",
        xaxis: {
          title: "Date",
          range:
            data.date[0] === chartData.date[0] &&
            data.date[data.date.length - 1] ===
              chartData.date[chartData.date.length - 1]
              ? [data.date[0], data.date[chartData.date.length - 1]]
              : [chartData.date[0], chartData.date[chartData.date.length - 1]],
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
      },
      data,
      setChartData,
      setToggle
    );

  const toggleData = toggle ? chartData : data;
  const transformedData = [
    {
      x: toggleData.date, // The x-axis values
      y: cumulativeSum(toggleData.profit_short), // The y-values for 'profit_short'
      mode: "lines",
      name: "Short",
    },
    {
      x: toggleData.date,
      y: cumulativeSum(toggleData.profit_long),
      mode: "lines",
      name: "Long",
    },
    {
      x: toggleData.date,
      y: cumulativeSum(toggleData.profit_total),
      mode: "lines",
      name: "Total",
    },
  ];

  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "-2.6rem" }}>
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
            onChange={(state) => {
              setToggle(state);
            }}
          />
        </Tooltip>
        <Tooltip title="Reset Changes" placement="top">
          <Button
            style={{
              marginLeft: "3rem",
              marginRight: "-3rem",
              zIndex: "9999",
              padding: "8px",
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
          height: "100%",
          xaxis: {
            title: "Date",
            range:
              data.date[0] === chartData.date[0] &&
              data.date[data.date.length - 1] ===
                chartData.date[chartData.date.length - 1]
                ? [data.date[0], data.date[chartData.date.length - 1]]
                : [
                    chartData.date[0],
                    chartData.date[chartData.date.length - 1],
                  ],
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
          onChangeLayout(layout);
        }}
      />
    </>
  );
}

export default ProfitCumChart;
