export function getDayName(date) {
  // Array of day names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // Get the day index (0-6)
  const dayIndex = date.getDay();

  // Return the day name
  return days[dayIndex];
}

export function getMonthName(date) {
  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // Get the month index (0-11)
  const monthIndex = date.getMonth();

  // Return the month name
  return months[monthIndex];
}
