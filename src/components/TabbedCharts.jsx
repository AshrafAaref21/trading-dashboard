import { Tabs } from "antd";
import Item from "antd/es/list/Item";
import ProfitCumChart from "./ProfitCumChart";
import WinsLossesChart from "./WinsLossesChart";
import { useDataContext } from "../context/DataContext";

// const { TabPane } = Tabs;

const TabbedCharts = () => {
  const { data } = useDataContext();

  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <Item tab="Profit Chart" key="1">
          <ProfitCumChart data={data} />
          {/* <TestChart /> */}
        </Item>

        <Item tab="Wins vs Losses" key="2">
          <WinsLossesChart data={data} />
        </Item>
      </Tabs>
    </div>
  );
};

export default TabbedCharts;
