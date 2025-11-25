import { fetchJiraTasks } from "../../api/fetchJiraTasks";
import { fetchOtherTasks } from "../../api/fetchOtherTasks";
import { mapJiraTasks } from "../jira/mapJiraTasks";
import { mapOtherTasks } from "../other/mapOtherTasks";
import { mapCombinedTasks } from "./mapCombinedTasks";

export async function useCaseCombinedTasks({ status }) {
  const [jiraRaw, otherRaw] = await Promise.all([
    fetchJiraTasks({ status }),
    fetchOtherTasks({ status })
  ]);

  const jira = mapJiraTasks(jiraRaw);
  const other = mapOtherTasks(otherRaw);

  const jiraWithPlatform = jira.map(task => ({
    ...task,
    plataforma: "jira"
  }));

  const otherWithPlatform = other.map(task => ({
    ...task,
    plataforma: "other"
  }));

  return mapCombinedTasks(jiraWithPlatform, otherWithPlatform);
}