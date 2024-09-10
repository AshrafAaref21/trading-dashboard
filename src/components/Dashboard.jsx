import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Dashboard({ setBaseData }) {
  return (
    <div>
      <h1>zzzzzz</h1>
      <Button onClick={() => setBaseData([])}>
        <LeftCircleOutlined />
      </Button>
    </div>
  );
}

export default Dashboard;
