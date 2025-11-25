import { fetchJiraTasks } from "../../api/fetchJiraTasks";
import { fetchOtherTasks } from "../../api/fetchOtherTasks";
import { mapJiraTasks } from "../jira/mapJiraTasks";
import { mapOtherTasks } from "../other/mapOtherTasks";
import { mapCombinedTasks } from "./mapCombinedTasks";

export async function useCaseCombinedTasks({ status }) {

  const results = await Promise.allSettled([
    fetchJiraTasks({ status }),
    fetchOtherTasks({ status })
  ]);

  const jiraResult = results[0];
  const otherResult = results[1];

  const jiraRaw = jiraResult.status === "fulfilled" ? jiraResult.value : [];
  const otherRaw = otherResult.status === "fulfilled" ? otherResult.value : [];

  const jira = mapJiraTasks(jiraRaw).map(task => ({
    ...task,
    plataforma: "jira"
  }));

  const other = mapOtherTasks(otherRaw).map(task => ({
    ...task,
    plataforma: "other"
  }));

  const finalTasks = mapCombinedTasks(jira, other);

  return finalTasks;
}
