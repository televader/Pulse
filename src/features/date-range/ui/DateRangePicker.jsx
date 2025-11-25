import { useDateRange } from "../context/useDateRange";

function DateRangePicker() {
  const { dateRange, setDateRange } = useDateRange();

  function handleChange(e) {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  }

  return (  
    <div>
      <label>
        Desde:{" "}
        <input
          type="date"
          name="from"
          value={dateRange.from}
          onChange={handleChange}
        />
      </label>

      <label>
        Hasta:{" "}
        <input
          type="date"
          name="to"
          value={dateRange.to}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default DateRangePicker;
