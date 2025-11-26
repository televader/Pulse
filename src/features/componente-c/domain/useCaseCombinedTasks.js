import { fetchJiraTasks } from "../api/fetchJiraTasks";
import { fetchOtherTasks } from "../api/fetchOtherTasks";
import { mapJiraTasks } from "./mapJiraTasks";
import { mapOtherTasks } from "./mapOtherTasks";
import { mapCombinedTasks } from "./mapCombinedTasks";

export async function useCaseCombinedTasks({ status }) {
  console.log("Ejecutando useCaseCombinedTasks…");

  const results = await Promise.allSettled([
    fetchJiraTasks({ status }),
    fetchOtherTasks({ status }),
  ]);

  const jiraResult = results[0];
  const otherResult = results[1];

  // Detectar si cada API fallo
  const jiraFailed = jiraResult.status === "rejected";
  const otherFailed = otherResult.status === "rejected";

  // si falla → array vacio
  const jiraRaw = jiraFailed ? [] : jiraResult.value;
  const otherRaw = otherFailed ? [] : otherResult.value;

  // Mapear dominio
  const jira = mapJiraTasks(jiraRaw).map((task) => ({
    ...task,
    plataforma: "jira",
  }));

  const other = mapOtherTasks(otherRaw).map((task) => ({
    ...task,
    plataforma: "other",
  }));

  // Combinar datos
  const tasks = mapCombinedTasks(jira, other);

  console.log("Resultado final combineTasks:", tasks);

  // Objeto de errores para la UI
  const errors = {
    jiraFailed,
    otherFailed,
  };

  return { tasks, errors };
}
