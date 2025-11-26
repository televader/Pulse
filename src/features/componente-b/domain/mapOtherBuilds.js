export function mapOtherBuilds(raw) {
  return raw.map(item => ({
    id: Number(item.id),
    branch: item.branch,
    status: item.status,   // "failed"
    date: new Date(item.date)
  }));
}