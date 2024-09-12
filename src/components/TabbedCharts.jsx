import { Tabs } from "antd";
import Item from "antd/es/list/Item";
import ProfitCumChart from "./ProfitCumChart";
import WinsLossesChart from "./WinsLossesChart";

// const { TabPane } = Tabs;

const TabbedCharts = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <Item tab="Profit Chart" key="1">
          <ProfitCumChart />
          {/* <TestChart /> */}
        </Item>

        <Item tab="Wins vs Losses" key="2">
          <WinsLossesChart />
        </Item>
      </Tabs>
    </div>
  );
};

export default TabbedCharts;
