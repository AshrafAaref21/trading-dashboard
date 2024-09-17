import Plot from "react-plotly.js";
import { useDataContext } from "../context/DataContext";
import { mergeRanges } from "../utils/helper";
import dayjs from "dayjs";

function WinsLossesChart() {
  const { data, excludedRanges, isFilterEnabled } = useDataContext();
  const transformedData = [
    {
      x: data.date,
      y: data.mwh_total,
      name: "# Economics",
      mode: "lines",
    },
    {
      x: data.date,
      y: data.win_count,
      name: "# Wins",
      mode: "lines",
    },
  ];

  return (
    <>
      <Plot
        data={transformedData}
        layout={{
          xaxis: {
            title: "Date",
          },
          yaxis: {
            title: { text: "Wins and Losses", standoff: 30 }, // Y-axis label
          },
          showlegend: true, //
          legend: { x: -0.2, y: 1.5 },
          width: 900,
          height: "100%",
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
                  fillcolor: "rgba(200, 200, 200, 0.5)",
                  line: {
                    color: "rgba(200, 200, 200, 0.5)",
                    width: 0,
                  },
                }))
              : [],
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        // onRelayout={onChangeLayout}
        config={
          {
            modeBarButtons: [
              [
                "zoom2d", // Zoom button
                "pan2d", // Pan button
                "zoomIn2d", // Zoom in button
                "zoomOut2d",
                "resetScale2d",
              ],
            ],
            displaylogo: false, // Remove the Plotly logo
            responsive: true,
          } // Keep the chart responsive
        }
      />
    </>
  );
}

export default WinsLossesChart;
