const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDateTime = (date: string) => {
  if (!date || date === "") {
    return {
      dateString: `---`,
      date: `---`,
      time: `---`,
    };
  }

  const dateD = new Date(date);

  const year = dateD.getUTCFullYear();
  const month = dateD.getUTCMonth();
  const day = dateD.getUTCDate();
  const hours = dateD.getUTCHours();
  const minutes = dateD.getUTCMinutes();

  return {
    dateString: `${day} ${months[month]} ${year}`,
    date: `${month + 1}/${day}/${year}`,
    time: `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}`,
  };
};
