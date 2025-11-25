import ComponenteA from "../../features/componente-a/ui/ComponenteA";
import ComponenteB from "../../features/componente-b/ui/ComponenteB";
import ComponenteC from "../../features/componente-c/ui/ComponenteC";

export const registry = [
  {
    id: "prs",
    title: "Pull Requests de GitHub",
    component: ComponenteA,
  },
  {
    id: "builds",
    title: "Builds Fallidos",
    component: ComponenteB,
  },
  {
    id: "tasks-combined",
    title: "Tareas Activas",
    component: ComponenteC,
  },
];