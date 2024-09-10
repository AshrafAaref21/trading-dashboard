import { useState } from "react";
import { Select, Table, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Option } = Select;

const DropdownWithTable = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Sample data for different dropdown options
  const data = {
    option1: [
      { key: "1", name: "John", age: 32, address: "New York" },
      { key: "2", name: "Mike", age: 25, address: "Los Angeles" },
    ],
    option2: [
      { key: "1", name: "Alice", age: 22, address: "London" },
      { key: "2", name: "Bob", age: 28, address: "Paris" },
    ],
  };

  // Columns for the table
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
  ];

  // Function to handle dropdown selection
  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  // Function to generate CSV and trigger download
  const downloadCSV = () => {
    if (selectedOption) {
      const tableData = data[selectedOption];
      const headers = columns.map((col) => col.title).join(",");
      const rows = tableData.map((row) =>
        columns.map((col) => row[col.dataIndex]).join(",")
      );
      const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows.join(
        "\n"
      )}`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${selectedOption}_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <Select
        placeholder="Select an option"
        style={{ width: 200, marginBottom: 20, height: 35 }}
        onChange={handleSelectChange}
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </Select>

      {selectedOption && (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={downloadCSV}
          style={{ marginBottom: 20, marginLeft: 10, height: 35 }}
          title="Download as csv"
          shape="circle"
        />
      )}

      {selectedOption && (
        <Table
          dataSource={data[selectedOption]}
          columns={columns}
          pagination={false}
        />
      )}
    </div>
  );
};

export default DropdownWithTable;
