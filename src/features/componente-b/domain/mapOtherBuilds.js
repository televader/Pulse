/* export function mapOtherBuilds(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    branch: item.branch,
    status: item.status,
    date: new Date(item.date)
  }));
} */

/* 
  --------------
export function mapOtherBuilds(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    title: item.titulo ?? item.title,
    status: item.status,
    date: item.date
  }));
} */

  export function mapOtherBuilds(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    title: item.titulo ?? item.title,
    status: item.status,
    date: new Date(item.date)
  }));
}
