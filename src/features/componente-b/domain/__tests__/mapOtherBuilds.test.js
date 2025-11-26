import { mapOtherBuilds } from "../mapOtherBuilds";

test("mapea builds fallidos correctamente", () => {
  const raw = [
    {
      id: 10,
      title: "Error en pipeline",
      status: "failed",
      date: "2025-01-01"
    }
  ];

  const result = mapOtherBuilds(raw);

  expect(result).toEqual([
    {
      id: 10,
      title: "Error en pipeline",
      status: "failed",
      date: new Date("2025-01-01")
    }
  ]);
});
