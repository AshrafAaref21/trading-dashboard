import DataServiceProvider from "./context/DataContext";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <DataServiceProvider>
      <Wrapper />
    </DataServiceProvider>
  );
}

export default App;
