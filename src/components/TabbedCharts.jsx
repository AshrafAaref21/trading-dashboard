import { useState } from "react";
import { Tabs } from "antd";
import Plot from "react-plotly.js";

const { TabPane } = Tabs;

const TabbedCharts = () => {
  // Define some state that will be reset
  const [chartData, setChartData] = useState(null);

  // Handler for resetting the state when switching tabs
  const handleTabChange = (key) => {
    console.log(`Selected tab: ${key}`);
    // Reset your state here
    console.log("chartData", chartData);
    setChartData(null);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange} centered>
        {/* Tab 1 */}
        <TabPane tab="Chart 1" key="1">
          <Plot
            data={[
              {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17],
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
              { type: "bar", x: [1, 2, 3, 4], y: [12, 9, 15, 12] },
            ]}
            layout={{ width: 600, height: 400, title: "Chart 1" }}
          />
        </TabPane>

        {/* Tab 2 */}
        <TabPane tab="Chart 2" key="2">
          <Plot
            data={[
              {
                values: [19, 26, 55],
                labels: ["Residential", "Non-Residential", "Utility"],
                type: "pie",
              },
            ]}
            layout={{ width: 600, height: 400, title: "Chart 2" }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabbedCharts;
