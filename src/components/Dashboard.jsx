import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./dashboard.css";
import TabbedCharts from "./TabbedCharts";
import DropdownWithTable from "./DropDownWithTable";
import { useDataContext } from "../context/DataContext";
import ScrollableTable from "./ScrollabeTable";
import StatisticsCard from "./StatisticsCard";

function Dashboard() {
  const { setData } = useDataContext();
  return (
    <div className="dash-layout">
      <div className="dash-container">
        <TabbedCharts />
        {/* <DropdownWithTable /> */}
        <div style={{ marginTop: "1rem" }}>
          <StatisticsCard />
          <ScrollableTable />
        </div>
      </div>
      <Button
        className="dash-btn"
        onClick={() => setData({})}
        shape="circle"
        type="dashed"
        icon={<LeftCircleOutlined />}
      />
    </div>
  );
}

export default Dashboard;
