/* export function mapGithubPrs(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    titulo: item.titulo,
    autor: item.autor,
    status: item.status, // string: "pending" | "merged"
    date: new Date(item.date)
  }));
} */
/* ----------
export function mapGithubPrs(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    title: item.titulo ?? item.title, 
    author: item.autor ?? item.author,
    status: item.status,
    date: item.date 
  }));
}

 */

export function mapGithubPrs(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    title: item.titulo ?? item.title,
    author: item.autor ?? item.author,
    status: item.status,
    date: new Date(item.date)
  }));
}
