export function mapJiraTasks(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    tarea: item.tarea,
    responsable: item.responsable,
    status: item.status, // string
    date: new Date(item.date)
  }));
}