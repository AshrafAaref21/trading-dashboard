import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";

function App() {
  const [baseData, setBaseData] = useState([]);
  console.log(baseData);
  return (
    <Layout
      Header={<Header />}
      Content={
        baseData.length ? (
          <Dashboard setBaseData={setBaseData} />
        ) : (
          <Form setBaseData={setBaseData} />
        )
      }
    />
  );
}

export default App;
