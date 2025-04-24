// Formatage de la date pour HistoryCard

export const formatDate = (data) => {
  const date = new Date(data);
  const month = date.getMonth() + 1 < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  return `${date.getDate()}/${month}/${date.getFullYear()}`;
};