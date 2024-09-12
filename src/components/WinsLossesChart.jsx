import Plot from "react-plotly.js";
import { useDataContext } from "../context/DataContext";

function WinsLossesChart() {
  const { data } = useDataContext();
  // Define the trace renaming as per your logic
  const newNames = { mwh_total: "# Economics", win_count: "# Wins" };
  if (!data.date) return;
  // Create the transformed data for Plotly
  const transformedData = [
    {
      x: data.date, // X-axis data (dates)
      y: data.mwh_total, // Y-axis data for "mwh_total"
      name: newNames["mwh_total"], // Renamed trace
      mode: "lines",
      // line: { color: "blue" }, // Optional: line color for distinction
    },
    {
      x: data.date, // X-axis data (dates)
      y: data.win_count, // Y-axis data for "win_count"
      name: newNames["win_count"], // Renamed trace
      mode: "lines",
      // line: { color: "green" }, // Optional: different line color
    },
  ];

  return (
    <Plot
      data={transformedData}
      layout={{
        xaxis: {
          title: "Date",
          // tickformat: "%Y-%m-%d", // Format ticks as YYYY-MM-DD
        },
        yaxis: {
          title: { text: "Wins and Losses", standoff: 30 }, // Y-axis label
        },
        showlegend: true, // Show the legend for renamed traces
        legend: { x: -0.2, y: 1.5 }, // Position the legend
        width: 800,
        height: 400,
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default WinsLossesChart;
