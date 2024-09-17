import dayjs from "dayjs";
import { useDataContext } from "../context/DataContext";
import { Button, Checkbox, Slider } from "antd";
import { useExcludeFilter } from "../hooks/useExcludeFilter";

function ExcludeRange() {
  const {
    data,
    chartData,
    toggle,
    isFilterEnabled,
    setIsFilterEnabled,
    excludedRanges,
    setExcludedRanges,
  } = useDataContext();

  const targetData = toggle ? chartData : data;

  const startDate = dayjs(targetData.date[0]).unix();
  const endDate = dayjs(targetData.date[targetData.date.length - 1]).unix();

  const {
    range,
    HandleIsFilter,
    handleSliderChange,
    handleClickFilter,
    handleResetExcluding,
  } = useExcludeFilter();

  const handleCheckboxChange = (e) => {
    setIsFilterEnabled(e.target.checked);
    if (!e.target.checked && excludedRanges.length > 0) handleResetExcluding();
    if (e.target.checked && excludedRanges.length > 0) HandleIsFilter();
  };

  return (
    <div style={{ marginTop: "15px", padding: "0 100px" }}>
      <>
        <Checkbox onChange={handleCheckboxChange} checked={isFilterEnabled}>
          Enable Date Range Filter
        </Checkbox>
        {isFilterEnabled && (
          <>
            <Button
              // danger
              type="dashed"
              shape="round"
              onClick={handleClickFilter}
              style={{ marginLeft: "3rem" }}
            >
              Exclude Range
            </Button>

            <Button
              danger
              // type="dashed"
              disabled={excludedRanges.length < 1}
              shape="round"
              onClick={() => {
                handleResetExcluding();
                setIsFilterEnabled(false);
                setExcludedRanges([]);
              }}
              style={{ marginLeft: "3rem" }}
            >
              Reset Excluded Ranges
            </Button>
          </>
        )}
      </>
      {isFilterEnabled && (
        <Slider
          range
          value={range}
          min={startDate}
          max={endDate}
          onChange={handleSliderChange}
          tipFormatter={(value) => dayjs.unix(value).format("YYYY-MM-DD")}
          style={{ marginLeft: "50px" }}
        />
      )}
    </div>
  );
}

export default ExcludeRange;
