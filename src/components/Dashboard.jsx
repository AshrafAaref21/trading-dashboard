import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./dashboard.css";
import TabbedCharts from "./TabbedCharts";
import DropdownWithTable from "./DropDownWithTable";

function Dashboard({ setBaseData }) {
  return (
    <div className="dash-layout">
      <div className="dash-container">
        <TabbedCharts />
        <DropdownWithTable />
      </div>
      <Button
        className="dash-btn"
        onClick={() => setBaseData([])}
        shape="circle"
        type="dashed"
        icon={<LeftCircleOutlined />}
      />
    </div>
  );
}

export default Dashboard;
