import { Form as AndForm, Button, DatePicker, Input, Spin } from "antd";
import { useDataContext } from "../context/DataContext";

function Form() {
  const {
    requestData,
    setInitialData,
    setData,
    setChartData,
    isLoading,
    setIsloading,
  } = useDataContext();

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(">>>>>>>>>>>>>>");
    setIsloading(true);
    const newData = await requestData();
    setData(newData);
    setChartData(newData);
    setInitialData(newData);
    setIsloading(false);
  };

  const onFinishFailed = (errorInfo) => {
    setIsloading(false);
    console.log("Failed:", errorInfo);
  };
  return (
    <AndForm
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: "100%", marginTop: "2.4rem" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <AndForm.Item
        label="Date Range"
        name="dateRange"
        rules={[{ required: true, message: "Please Select Both Dates" }]}
        style={{ marginTop: "2rem" }}
      >
        <DatePicker.RangePicker
          style={{ width: "60%" }}
          format="YYYY-MM-DD"
          disabled={isLoading}
        />
      </AndForm.Item>

      <AndForm.Item
        label="Market Name"
        name="market"
        rules={[
          {
            required: true,
            message: "Please input the market name!",
          },
        ]}
        style={{ marginTop: "2rem" }}
      >
        <Input style={{ width: "60%" }} disabled={isLoading} />
      </AndForm.Item>

      <AndForm.Item
        label="Model Name"
        name="model"
        rules={[
          {
            required: true,
            message: "Please input the model name!",
          },
        ]}
        style={{ marginTop: "2rem" }}
      >
        <Input style={{ width: "60%" }} disabled={isLoading} />
      </AndForm.Item>

      <AndForm.Item
        label="Node Name"
        name="node"
        rules={[
          {
            required: true,
            message: "Please input the Node name!",
          },
        ]}
        style={{ marginTop: "2rem" }}
      >
        <Input style={{ width: "60%" }} disabled={isLoading} />
      </AndForm.Item>

      <AndForm.Item
        wrapperCol={{ offset: 4, span: 36 }}
        style={{ marginTop: "2.5rem" }}
      >
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              Send Request
            </Button>
            <Button
              style={{ marginLeft: "1.1rem" }}
              type="primary"
              danger
              htmlType="reset"
              disabled={isLoading}
            >
              Reset
            </Button>
          </>
        )}
      </AndForm.Item>
    </AndForm>
  );
}

export default Form;
