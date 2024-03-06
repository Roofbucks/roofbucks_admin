import { CalendarIconOutline } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { DateRangePicker, Range } from "react-date-range";
import { Button } from "..";
import { useClickOutside } from "hooks";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRangeProps {
  className?: string;
  startDate: string;
  endDate: string;
  handleChange: (start, end) => void;
}

const MyDateRangePicker: React.FC<DateRangeProps> = ({
  className,
  startDate,
  endDate,
  handleChange,
}) => {
  const [showRangePicker, setShowRangePicker] = React.useState(false);
  const [statRange, setStatRange] = React.useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  React.useEffect(() => {
    setStatRange({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  }, [startDate, endDate]);

  const rangeBody = React.useRef(null);
  useClickOutside(rangeBody, () => setShowRangePicker(false));

  const handleApply = () => {
    handleChange(statRange.startDate, statRange.endDate);
    setShowRangePicker(false);
  };

  return (
    <div ref={rangeBody} className={`${styles.showDate} ${className}`}>
      <CalendarIconOutline
        role="button"
        onClick={() => setShowRangePicker(!showRangePicker)}
        className={styles.showDateRangeIcon}
      />
      {showRangePicker ? (
        <div className={styles.wrapper}>
          <DateRangePicker
            className={styles.dateRange}
            editableDateInputs={true}
            onChange={(item) => {
              setStatRange({
                startDate: item.selection.startDate
                  ? new Date(item.selection.startDate)
                  : new Date(),
                endDate: item.selection.endDate
                  ? new Date(item.selection.endDate)
                  : new Date(),
              });
            }}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                ...statRange,
                key: "selection",
              },
            ]}
            // showDateDisplay
            // showMonthAndYearPickers
          />

          <Button onClick={handleApply} type="primary">
            Apply
          </Button>
        </div>
      ) : (
        ""
      )}
      <p>{new Date(startDate)?.toLocaleDateString()}</p>-
      <p>{new Date(endDate)?.toLocaleDateString()}</p>
    </div>
  );
};

export { MyDateRangePicker };
