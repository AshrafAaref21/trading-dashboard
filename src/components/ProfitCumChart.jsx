import Plot from "react-plotly.js";
import {
  cumulativeSum,
  getUniqueSubArrays,
  mergeRanges,
} from "../utils/helper";
import { Button, Switch, Tooltip } from "antd";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import dayjs from "dayjs";

function ProfitCumChart() {
  const {
    data,
    chartData,
    setChartData,
    toggle,
    setToggle,
    isFilterEnabled,
    excludedRanges,
  } = useDataContext();

  const {
    onChangeLayout,
    handleReset,
    chartLayout,
    traceVisibility,
    handleLegendClick,
  } = useRelayout({}, data, setChartData);

  const toggleData = toggle ? chartData : data;

  const transformedData = [
    {
      x: toggleData.date, // The x-axis values
      y: cumulativeSum(toggleData.profit_short), // The y-values for 'profit_short'
      name: "Short",
      visible: traceVisibility[0] ? true : "legendonly",
    },
    {
      x: toggleData.date,
      y: cumulativeSum(toggleData.profit_long),
      visible: traceVisibility[1] ? true : "legendonly",
      name: "Long",
    },
    {
      x: toggleData.date,
      y: cumulativeSum(toggleData.profit_total),
      name: "Total",
      visible: traceVisibility[2] ? true : "legendonly",
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "40%",
          margin: toggle ? "10px" : "20px",
          height: "10%",
        }}
      >
        <Tooltip title="Area Only" placement="top">
          <Switch
            disabled={chartLayout === null}
            className="large-switch"
            style={{ zIndex: "9999", marginTop: "auto" }}
            checked={toggle}
            onChange={(state) => {
              setToggle(state);
            }}
          />
        </Tooltip>
        {toggle && (
          <Tooltip title="Reset Changes" placement="top">
            <Button
              style={{
                marginLeft: "4rem",
                zIndex: "9999",
                padding: "4px",
                // height: "100%",
              }}
              danger
              size="large"
              shape="circle"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Tooltip>
        )}
      </div>
      <Plot
        data={transformedData}
        layout={{
          width: 900,
          height: "100%",
          xaxis: {
            title: "Date",
            range: chartLayout
              ? [chartData.date[0], chartData.date[chartData.date.length - 1]]
              : [data.date[0], data.date[data.date.length - 1]],
          },
          yaxis: {
            title: { text: "Profit Cumulative", standoff: 30 },
          },
          legend: {
            x: -0.2,
            y: 1.5,
          },
          showlegend: true,
          dragmode: "pan",
          shapes:
            excludedRanges.length > 0 && isFilterEnabled
              ? mergeRanges(excludedRanges).map(([start, end]) => ({
                  type: "rect",
                  x0: dayjs(start).format("YYYY-MM-DD"),
                  x1: dayjs(end).format("YYYY-MM-DD"),
                  y0: 0,
                  y1: 1,
                  xref: "x",
                  yref: "paper",
                  fillcolor: "rgba(255, 99, 132, 0.2)",
                  line: {
                    color: "rgba(255, 99, 132, 0.2)",
                    width: 0,
                  },
                }))
              : [],
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        onRelayout={(layout) => {
          onChangeLayout(layout);
        }}
        onLegendClick={handleLegendClick}
      />
    </div>
  );
}

export default ProfitCumChart;
