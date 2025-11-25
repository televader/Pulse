import { createContext, useState } from "react";

export const DateRangeContext = createContext();

export function DateRangeProvider({ children }) {
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}