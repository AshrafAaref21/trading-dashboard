import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./dashboard.css";

function Dashboard({ setBaseData }) {
  return (
    <div className="dash-layout">
      <div className="dash-container">
        <div>comp1</div>
        <div>comp1</div>
      </div>
      <Button className="dash-btn" onClick={() => setBaseData([])}>
        <LeftCircleOutlined />
      </Button>
    </div>
  );
}

export default Dashboard;
