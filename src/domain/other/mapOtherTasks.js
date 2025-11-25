export function mapOtherTasks(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    tarea: item.tarea,
    responsable: item.responsable,
    status: item.status,
    date: new Date(item.date)
  }));
}