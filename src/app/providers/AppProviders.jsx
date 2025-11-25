import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DateRangeProvider } from "../../features/date-range/context/DateRangeContext";

const client = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={client}> 
      <DateRangeProvider>
        {children}
      </DateRangeProvider>
    </QueryClientProvider>
  );
}