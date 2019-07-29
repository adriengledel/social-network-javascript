export const compare = (a, b) => {
  let comparison = 0;
  const dateA = a.date;
  const dateB = b.date;

  if (dateA < dateB) {
    comparison = 1;
  } else if (dateA > dateB) {
    comparison = -1;
  }
  return comparison;
}