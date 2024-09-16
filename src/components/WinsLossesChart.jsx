import Plot from "react-plotly.js";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import { Button } from "antd";

function WinsLossesChart() {
  const { initialData, chartData } = useDataContext();
  const transformedData = [
    {
      x: initialData.date,
      y: initialData.mwh_total,
      name: "# Economics",
      mode: "lines",
    },
    {
      x: initialData.date,
      y: initialData.win_count,
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
            range:
              initialData === chartData
                ? [
                    initialData.date[0],
                    initialData.date[initialData.date.length - 1],
                  ]
                : [
                    chartData.date[0],
                    chartData.date[chartData.date.length - 1],
                  ],
          },
          yaxis: {
            title: { text: "Wins and Losses", standoff: 30 }, // Y-axis label
          },
          showlegend: true, //
          legend: { x: -0.2, y: 1.5 },
          width: 900,
          height: "100%",
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        // onRelayout={onChangeLayout}
      />
    </>
  );
}

export default WinsLossesChart;
