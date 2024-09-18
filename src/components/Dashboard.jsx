import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "./dashboard.css";
import TabbedCharts from "./TabbedCharts";
import { useDataContext } from "../context/DataContext";

import StatisticsCard from "./StatisticsCard";
import DropdownWithTable from "./DropDownWithTable";

function Dashboard() {
  const { setData } = useDataContext();
  return (
    <div className="dash-layout">
      <div className="dash-container">
        <TabbedCharts />
        <div style={{ marginTop: "1rem", height: "100%" }}>
          <StatisticsCard />
          <DropdownWithTable />
          {/* <ScrollableTable /> */}
        </div>
      </div>
      <Tooltip title="Back to form" placement="top">
        <Button
          className="dash-btn"
          onClick={() => setData({})}
          shape="circle"
          type="dashed"
          icon={<LeftCircleOutlined />}
        />
      </Tooltip>
    </div>
  );
}

export default Dashboard;
