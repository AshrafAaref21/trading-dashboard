import { Tabs } from "antd";
import Item from "antd/es/list/Item";
import ProfitCumChart from "./ProfitCumChart";
import WinsLossesChart from "./WinsLossesChart";
import { useDataContext } from "../context/DataContext";
import { useRelayout } from "../hooks/useRelayout";
import ExcludeRange from "./ExcludeRange";

// const { TabPane } = Tabs;

const TabbedCharts = () => {
  const { data, setChartData, setIsFilterEnabled } = useDataContext();
  const { handleReset } = useRelayout({}, data, setChartData);

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          handleReset();
          setIsFilterEnabled(false);
        }}
        centered
      >
        <Item tab="Profit Chart" key="1">
          <ProfitCumChart />
          {/* <TestChart /> */}
        </Item>

        <Item tab="Wins vs Losses" key="2">
          <WinsLossesChart />
        </Item>
      </Tabs>
      <ExcludeRange />
    </div>
  );
};

export default TabbedCharts;
