const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ==================================================
// HELPERS
// ==================================================
function between(dateStr, from, to) {
  if (!from || !to) return true;
  return dateStr >= from && dateStr <= to;
}

// ==================================================
// 1) GITHUB — Pull Requests pendientes
// ==================================================
const githubPRs = [
  { id: 1, titulo: "Fix auth bug", autor: "Pedro", status: "pending", date: "2025-01-10" },
  { id: 2, titulo: "Refactor API", autor: "Ana",    status: "merged",  date: "2025-02-12" },
  { id: 3, titulo: "Improve caching", autor: "Luis", status: "pending", date: "2025-03-01" },
  { id: 4, titulo: "Add unit tests", autor: "Juan", status: "pending", date: "2025-04-22" },
  { id: 5, titulo: "Fix dark mode", autor: "Carla", status: "merged",  date: "2025-05-19" },
  { id: 6, titulo: "Update dependencies", autor: "Pedro", status: "pending", date: "2025-06-11" },
  { id: 7, titulo: "Improve performance", autor: "Ana", status: "pending", date: "2025-07-14" },
  { id: 8, titulo: "Update readme", autor: "Luis", status: "merged",  date: "2025-08-05" },
  { id: 9, titulo: "Fix mobile layout", autor: "Carla", status: "pending", date: "2025-09-02" },
  { id: 10, titulo: "Refactor hooks", autor: "Juan", status: "pending", date: "2025-10-20" },
];

// GET /api/github/prs?status=pending&from=YYYY-MM-DD&to=YYYY-MM-DD
app.get("/api/github/prs", (req, res) => {
  const { status, from, to } = req.query;

  let result = githubPRs;

  if (status) {
    result = result.filter(item => item.status === status);
  }

  if (from && to) {
    result = result.filter(item => between(item.date, from, to));
  }

  res.json(result);
});

// ==================================================
// 2) JIRA — Tareas pendientes (sin filtro de fecha)
// ==================================================
const jiraTasks = [
  { id: 101, tarea: "Actualizar login", responsable: "María", status: "pending", date: "2025-01-05" },
  { id: 102, tarea: "Mejorar UI", responsable: "Juan", status: "in_progress", date: "2025-02-10" },
  { id: 103, tarea: "Fix tabla reportes", responsable: "Luis", status: "pending", date: "2025-03-12" },
  { id: 104, tarea: "Crear modal nuevo", responsable: "Ana", status: "done", date: "2025-04-01" },
  { id: 105, tarea: "Optimizar queries", responsable: "Carla", status: "pending", date: "2025-05-19" },
  { id: 106, tarea: "Refactor store", responsable: "Pedro", status: "in_progress", date: "2025-06-11" },
  { id: 107, tarea: "Fix permisos", responsable: "María", status: "pending", date: "2025-07-14" },
  { id: 108, tarea: "Crear tabla admin", responsable: "Juan", status: "done", date: "2025-08-05" },
  { id: 109, tarea: "Mejorar forms", responsable: "Luis", status: "pending", date: "2025-09-02" },
  { id: 110, tarea: "Tests e2e", responsable: "Carla", status: "pending", date: "2025-10-20" },
];

app.get("/api/jira/tasks", (req, res) => {
  const { status } = req.query;

  let result = jiraTasks;

  if (status) {
    result = result.filter(t => t.status === status);
  }

  res.json(result);
});

// ==================================================
// 3) API INVENTADA — Tareas
// ==================================================
const inventedTasks = [
  { id: 201, tarea: "Sync con CRM", responsable: "Lucas", status: "pending", date: "2025-01-20" },
  { id: 202, tarea: "Armar dashboard", responsable: "Gustavo", status: "done", date: "2025-02-12" },
  { id: 203, tarea: "Fix sesion", responsable: "Marta", status: "pending", date: "2025-03-04" },
  { id: 204, tarea: "Crear webhook", responsable: "Diego", status: "pending", date: "2025-04-15" },
  { id: 205, tarea: "Reporte mensual", responsable: "Lucas", status: "done", date: "2025-05-22" },
  { id: 206, tarea: "Refactor auth", responsable: "Gustavo", status: "pending", date: "2025-06-13" },
  { id: 207, tarea: "Fix mobile menu", responsable: "Diego", status: "pending", date: "2025-07-25" },
  { id: 208, tarea: "Crear backups", responsable: "Marta", status: "done", date: "2025-08-14" },
  { id: 209, tarea: "Actualizar tablas", responsable: "Lucas", status: "pending", date: "2025-09-02" },
  { id: 210, tarea: "Revisión final", responsable: "Gustavo", status: "pending", date: "2025-10-28" },
];

app.get("/api/invented/tasks", (req, res) => {
  const { status } = req.query;

  let result = inventedTasks;

  if (status) {
    result = result.filter(t => t.status === status);
  }

  res.json(result);
});

// ==================================================
// 4) API INVENTADA — Builds fallidos
// ==================================================
const inventedBuilds = [
  { id: 301, branch: "main", status: "failed", date: "2025-01-10" },
  { id: 302, branch: "develop", status: "failed", date: "2025-02-21" },
  { id: 303, branch: "release", status: "failed", date: "2025-03-15" },
  { id: 304, branch: "hotfix", status: "failed", date: "2025-04-27" },
  { id: 305, branch: "main", status: "failed", date: "2025-05-09" },
  { id: 306, branch: "develop", status: "failed", date: "2025-06-18" },
  { id: 307, branch: "release", status: "failed", date: "2025-07-05" },
  { id: 308, branch: "main", status: "failed", date: "2025-08-14" },
  { id: 309, branch: "develop", status: "failed", date: "2025-09-29" },
  { id: 310, branch: "hotfix", status: "failed", date: "2025-10-11" },
];

app.get("/api/invented/builds", (req, res) => {
  const { from, to } = req.query;

  const result = inventedBuilds.filter(b => between(b.date, from, to));

  res.json(result);
});

// ==================================================
app.listen(4000, () => {
  console.log("Backend listo en http://localhost:4000");
});