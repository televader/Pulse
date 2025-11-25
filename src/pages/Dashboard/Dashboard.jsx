import { registry } from "../../app/registry";
import DateRangePicker from "../../features/date-range/ui/DateRangePicker";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <DateRangePicker />

      <div style={{ display:"flex", flexdirection:"column",gap:"3rem" }}>

      {registry.map((item) => {
        const Widget = item.component;

        return (
          <div key={item.id} style={{ marginBottom: 40 }}>
            <h2>{item.title}</h2>
            <Widget />
          </div>
        );
      })}
    </div>
    </div>
  );
}