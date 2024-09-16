import Plot from "react-plotly.js";
import { cumulativeSum } from "../utils/helper";
import { Button, Switch, Tooltip } from "antd";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";

function ProfitCumChart() {
  const { initialData, data, chartData, setChartData, toggle, setToggle } =
    useDataContext();
  console.log("initialData", initialData);

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
      type: "scatter",
      mode: "lines+markers",
      visible: traceVisibility[0] ? true : "legendonly",
      marker: {
        size: 4, // Smaller scatter points (adjust size as needed)
      },
    },
    {
      x: toggleData.date,
      y: cumulativeSum(toggleData.profit_long),
      name: "Long",
      type: "scatter",
      mode: "lines+markers",
      visible: traceVisibility[1] ? true : "legendonly",
      marker: {
        size: 4, // Smaller scatter points (adjust size as needed)
      },
    },
    {
      x: toggleData.date,
      y: cumulativeSum(toggleData.profit_total),
      name: "Total",
      type: "scatter",
      mode: "lines+markers",
      visible: traceVisibility[2] ? true : "legendonly",
      marker: {
        size: 4, // Smaller scatter points (adjust size as needed)
      },
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "-2.6rem" }}>
        <Tooltip title="Area Only" placement="top">
          <Switch
            disabled={chartLayout === null}
            className="large-switch"
            style={{ zIndex: "9999" }}
            checked={toggle}
            onChange={(state) => {
              setToggle(state);
            }}
          />
        </Tooltip>
        <Tooltip title="Reset Changes" placement="top">
          <Button
            style={{
              marginLeft: "4rem",
              marginRight: "-3rem",
              zIndex: "9999",
              padding: "8px",
            }}
            danger
            size="large"
            shape="circle"
            onClick={handleReset}
            disabled={data === initialData && chartData === initialData}
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
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        onRelayout={(layout) => {
          onChangeLayout(layout);
        }}
        onLegendClick={handleLegendClick}
      />
    </>
  );
}

export default ProfitCumChart;
