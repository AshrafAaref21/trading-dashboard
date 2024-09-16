import { createContext, useContext, useState } from "react";
import postData from "../utils/service";

const DataContext = createContext(null);

export function DataServiceProvider({ children }) {
  const requestData = postData;
  const [initialData, setInitialData] = useState({});
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <DataContext.Provider
      value={{
        error,
        setError,
        initialData,
        setInitialData,
        requestData,
        data,
        setData,
        chartData,
        setChartData,
        isLoading,
        setIsloading,
        isFilterEnabled,
        setIsFilterEnabled,
        toggle,
        setToggle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);

  if (context === null) {
    throw new Error("Error - You have to use the DataServiceProvider");
  }
  return context;
}

export default DataServiceProvider;
