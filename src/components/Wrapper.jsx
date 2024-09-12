import { useDataContext } from "../context/DataContext";
import Dashboard from "./Dashboard";
import Form from "./Form";
import Header from "./Header";
import Layout from "./Layout";

function Wrapper() {
  const { data } = useDataContext();
  console.log("data//...", data);
  return (
    <Layout
      Header={<Header />}
      Content={data?.date ? <Dashboard /> : <Form />}
    />
  );
}

export default Wrapper;
