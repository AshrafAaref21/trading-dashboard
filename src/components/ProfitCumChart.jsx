import Plot from "react-plotly.js";
import { cumulativeSum, filterObjectByDateRange } from "../utils/helper";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Button } from "antd";
import { useDataContext } from "../context/DataContext";

function ProfitCumChart() {
  const { data, chartData, setChartData } = useDataContext();

  const [chartLayout, setChartLayout] = useState(null);

  const layoutRef = useRef({
    width: 800,
    height: 400,
    xaxis: {
      title: "Date", // X-axis label
      // tickformat: "%Y-%m-%d", // Format the ticks as YYYY-MM-DD
      // tickmode: "linear", // Force the tick mode to linear for custom intervals
      // dtick: 86400000, // 1 day in milliseconds (1000 ms * 60 s * 60 min * 24 hours)
    },
    yaxis: {
      title: { text: "Profit Cumulative", standoff: 30 },
    },
    legend: {
      x: -0.2, // x-position (1 = right side, 0 = left side)
      y: 1.5, // y-position (1 = top, 0 = bottom)
    },
    showlegend: true,
  });
  function onChangeLayout(layout) {
    setChartLayout({
      x0: dayjs(layout["xaxis.range[0]"]).format("YYYY-MM-DD"),
      x1: dayjs(layout["xaxis.range[1]"]).format("YYYY-MM-DD"),
    });
  }

  function handleReset() {
    setChartData(data);
  }

  function handleRelayout() {
    if (!chartLayout?.x0) return;
    const filteredData = filterObjectByDateRange(
      data,
      chartLayout?.["x0"],
      chartLayout?.["x1"]
    );
    setChartData(filteredData);
  }

  console.log("ChartLayout", chartLayout);

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
        <Button
          size="large"
          shape="circle"
          type="primary"
          style={{ padding: "6px", zIndex: "9999" }}
          onClick={handleRelayout}
        >
          Apply
        </Button>
        <Button
          style={{
            marginLeft: "1.1rem",
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
      </div>
      <Plot
        data={transformedData}
        layout={layoutRef.current}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        onRelayout={onChangeLayout}
      />
    </>
  );
}

export default ProfitCumChart;
