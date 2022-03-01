export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  return `${newDate.toLocaleTimeString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
