import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./dashboard.css";
import TabbedCharts from "./TabbedCharts";
import DropdownWithTable from "./DropDownWithTable";
import { useDataContext } from "../context/DataContext";

function Dashboard() {
  const { data, setData } = useDataContext();
  console.log("context", data);
  return (
    <div className="dash-layout">
      <div className="dash-container">
        <TabbedCharts />
        <DropdownWithTable />
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
