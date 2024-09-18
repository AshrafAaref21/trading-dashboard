import { useRef, useState } from "react";
import { filterObjectByDateRange } from "../utils/helper";
import dayjs from "dayjs";
import { useDataContext } from "../context/DataContext";

export function useRelayout(baseLayout, baseData, setChartData) {
  const layoutRef = useRef(baseLayout);
  const [traceVisibility, setTraceVisibility] = useState([false, false, true]);

  const handleLegendClick = (event) => {
    // const traceIndex = event.curveNumber; // Get the index of the clicked trace
    // const newVisibility = [...traceVisibility];
    // newVisibility[traceIndex] = !newVisibility[traceIndex]; // Toggle visibility
    // setTraceVisibility(newVisibility); // Update state
    // return false; // Prevent Plotly's default legend toggle behavior

    const traceIndex = event.curveNumber; // Get the index of the clicked trace
    // Create a new visibility array where only the clicked trace is visible
    const newVisibility = traceVisibility.map(
      (_, index) => index === traceIndex
    );

    // Update the state with the new visibility array
    setTraceVisibility(newVisibility);

    return false;
  };

  const [chartLayout, setChartLayout] = useState(null);
  const { data, setToggle } = useDataContext();

  function onChangeLayout(layout) {
    if (
      layout === chartLayout ||
      layout["xaxis.range[0]"] === layout["xaxis.range[1]"]
    )
      return;

    setChartLayout({
      x0: dayjs(layout["xaxis.range[0]"]).format("YYYY-MM-DD"),
      x1: dayjs(layout["xaxis.range[1]"]).format("YYYY-MM-DD"),
    });

    const filteredData = filterObjectByDateRange(
      baseData,
      dayjs(layout["xaxis.range[0]"]).format("YYYY-MM-DD"),
      dayjs(layout["xaxis.range[1]"]).format("YYYY-MM-DD")
    );
    setChartData(filteredData);
  }

  function handleReset() {
    setChartData(data);
    setToggle(false);
    setChartLayout(null);
    setTraceVisibility([true, true, true]);
  }

  function handleRelayout() {
    if (!chartLayout?.x0) return;
    const filteredData = filterObjectByDateRange(
      baseData,
      chartLayout?.["x0"],
      chartLayout?.["x1"]
    );
    setChartData(filteredData);
  }

  return {
    layoutRef,
    onChangeLayout,
    handleReset,
    handleRelayout,
    chartLayout,
    setChartLayout,
    traceVisibility,
    handleLegendClick,
  };
}
