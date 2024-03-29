import { format } from "date-fns";

const getEndTime = (startTime: string, duration: number): string => {
  const [timeStr, meridiem] = startTime.split(" ");
  const [hours, minutes] = timeStr.split(":").map(Number);

  let newTime = new Date();
  newTime.setHours(hours);
  newTime.setMinutes(minutes);

  const endTime = new Date(newTime.getTime() + duration * 60000);

  const formattedEndTime = format(endTime, "h:mm a").replace(" ", "");

  return formattedEndTime.toUpperCase();
};

const daysMap: { [key: string]: string } = {
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
};

export { daysMap, getEndTime };
