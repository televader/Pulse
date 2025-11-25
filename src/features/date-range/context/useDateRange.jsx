import { useContext } from "react";
import { DateRangeContext } from "./DateRangeContext";

export const useDateRange = () => useContext(DateRangeContext);