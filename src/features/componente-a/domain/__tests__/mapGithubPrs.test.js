import { mapGithubPrs } from "../mapGithubPrs";

test("mapea PRs correctamente", () => {
  const raw = [
    {
      id: 1,
      titulo: "Fix login",
      autor: "Pedro",
      status: "pending",
      date: "2025-01-10"
    }
  ];

  const result = mapGithubPrs(raw);

  expect(result).toEqual([
    {
      id: 1,
      title: "Fix login",
      author: "Pedro",
      status: "pending",
      date: new Date("2025-01-10")
    }
  ]);
});
