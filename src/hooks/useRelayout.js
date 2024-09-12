import { useRef, useState } from "react";
import { filterObjectByDateRange } from "../utils/helper";
import dayjs from "dayjs";
import { useDataContext } from "../context/DataContext";

export function useRelayout(baseLayout, baseData, setChartData) {
  const layoutRef = useRef(baseLayout);
  const [chartLayout, setChartLayout] = useState(null);
  const { setIsFilterEnabled } = useDataContext();

  function onChangeLayout(layout) {
    setChartLayout({
      x0: dayjs(layout["xaxis.range[0]"]).format("YYYY-MM-DD"),
      x1: dayjs(layout["xaxis.range[1]"]).format("YYYY-MM-DD"),
    });
  }

  function handleReset() {
    setChartData(baseData);
    setIsFilterEnabled(false);
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
