export function formatNumber(num: number): string {
  if (num < 1_000) {
    return num.toString();
  } else if (num < 1_000_000) {
    return (num / 1_000).toFixed(1) + "k";
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
}

export function formatDate(dateString: string): string {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Define the formatting options
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Format the date and return it as a string
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}
