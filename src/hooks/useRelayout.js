import { useRef, useState } from "react";
import { filterObjectByDateRange } from "../utils/helper";
import dayjs from "dayjs";
import { useDataContext } from "../context/DataContext";

export function useRelayout(
  baseLayout,
  baseData,
  setChartData,
  setToggle = () => {}
) {
  const layoutRef = useRef(baseLayout);
  const [chartLayout, setChartLayout] = useState(null);
  const { setIsFilterEnabled, initialData, setData } = useDataContext();

  console.log("chartLayout", chartLayout);
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
    setChartData(initialData);
    setData(initialData);
    setIsFilterEnabled(false);
    setToggle(false);
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
  };
}
