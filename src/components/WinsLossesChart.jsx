import Plot from "react-plotly.js";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import { Button } from "antd";

function WinsLossesChart() {
  const { data, chartData, setChartData } = useDataContext();
  const { layoutRef, onChangeLayout, handleReset, handleRelayout } =
    useRelayout(
      {
        xaxis: {
          title: "Date",
          // tickformat: "%Y-%m-%d", // Format ticks as YYYY-MM-DD
        },
        yaxis: {
          title: { text: "Wins and Losses", standoff: 30 }, // Y-axis label
        },
        showlegend: true, // Show the legend for renamed traces
        legend: { x: -0.2, y: 1.5 }, // Position the legend
        width: 900,
        height: 400,
      },
      data,
      setChartData
    );
  const transformedData = [
    {
      x: chartData.date,
      y: chartData.mwh_total,
      name: "# Economics",
      mode: "lines",
    },
    {
      x: chartData.date,
      y: chartData.win_count,
      name: "# Wins",
      mode: "lines",
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
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        onRelayout={onChangeLayout}
      />
    </>
  );
}

export default WinsLossesChart;
