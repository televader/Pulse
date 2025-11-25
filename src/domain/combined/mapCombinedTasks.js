export function mapCombinedTasks(jira, other) {
  return [...jira, ...other].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
}