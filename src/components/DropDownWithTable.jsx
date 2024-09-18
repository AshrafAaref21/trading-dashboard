import { useState } from "react";
import { Button, Select, Table } from "antd";
import { useDataContext } from "../context/DataContext";
import { DownloadOutlined } from "@ant-design/icons";
import { filterMultipleRanges } from "../utils/helper";

const { Option } = Select;

const DropdownWithTable = () => {
  const [selectedOption, setSelectedOption] = useState("Current");
  const {
    initialData,
    data,
    chartData,
    toggle,
    isFilterEnabled,
    excludedRanges,
  } = useDataContext();

  const tableData = toggle ? chartData : data;
  const dataframes = {
    Current: tableData,
    Excluded: isFilterEnabled
      ? data
      : filterMultipleRanges(excludedRanges, data),
    Toggle: chartData,
    Full: initialData,
  };

  const dataSource = dataframes[selectedOption].date
    .map((_, index) =>
      Object.keys(dataframes[selectedOption]).reduce((acc, key) => {
        acc[key] = dataframes[selectedOption][key][index]; // Assign corresponding values for each column
        acc.key = index; // Ensure each row has a unique key
        return acc;
      }, {})
    )
    .filter((row) => row.profit_total !== null);

  const columns = Object.keys(initialData).map((key) => ({
    title:
      key.replace(/_/g, " ").charAt(0).toUpperCase() +
      key.replace(/_/g, " ").slice(1),
    dataIndex: key, // The key becomes the dataIndex
    key, // Unique key for each column
    width: 100, // You can adjust the width or remove it
    render: (text) => (
      <div style={{ fontSize: "12px" }}>
        {typeof text === "number" ? text.toFixed(2) : text}
      </div>
    ),
  }));

  const downloadCSV = () => {
    const headers = columns.map((col) => col.title).join(",") + "\n"; // Create CSV headers
    const rows = dataSource
      .map((row) => columns.map((col) => row[col.dataIndex]).join(","))
      .join("\n"); // Convert each row into a CSV row

    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Seer ${selectedOption} Data.csv`);
    document.body.appendChild(link); // Append the link to the DOM
    link.click(); // Programmatically click the link
    document.body.removeChild(link); // Remove the link from the DOM
  };

  // Function to handle dropdown selection
  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div style={{ marginTop: "10px", height: "100%" }}>
      <Select
        value={selectedOption}
        style={{ width: 200, marginBottom: 20, height: 35 }}
        onChange={handleSelectChange}
      >
        <Option value="Current">Current Data</Option>
        <Option value="Excluded">Excluded Data</Option>
        <Option value="Toggle">Toggle Data</Option>
        <Option value="Full">Full Data</Option>
      </Select>

      <Table
        style={{ width: "500px", fontSize: "12px" }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 500, y: 200 }}
        bordered
      />
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={downloadCSV}
        title="Download as csv"
        shape="round"
        size="large"
        style={{ marginTop: "1.2rem" }}
      >
        Download
      </Button>
    </div>
  );
};

export default DropdownWithTable;
