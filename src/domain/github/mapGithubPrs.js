export function mapGithubPrs(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    titulo: item.titulo,
    autor: item.autor,
    status: item.status, // string: "pending" | "merged"
    date: new Date(item.date)
  }));
}