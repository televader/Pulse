import React from "react";
import { DateRangeContext } from "../features/date-range/context/DateRangeContext";

export function MockDateRangeProvider({ children }) {
  return (
    <DateRangeContext.Provider
      value={{
        dateRange: { from: "2025-01-01", to: "2025-01-31" },
        setDateRange: () => {}
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}
