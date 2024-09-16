import Plot from "react-plotly.js";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import { Button } from "antd";

function WinsLossesChart() {
  const { data } = useDataContext();
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
      {/* <div style={{ marginTop: "0", marginBottom: "-2.6rem" }}>
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
      </div> */}
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
          height: 400,
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
        // onRelayout={onChangeLayout}
      />
    </>
  );
}

export default WinsLossesChart;
