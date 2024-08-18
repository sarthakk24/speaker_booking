import ical from 'ical-generator';

export const subtractTime = (date: Date, hours: number, minutes: number) => {
  const milliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  const newDate = new Date(date.getTime() - milliseconds);
  return newDate;
};

export const getIcalObjectInstance = (
  startTime: Date,
  endTime: Date,
  summary: string,
  description: string,
  location: string,
  url: string,
  organizer: { name: string; email: string }
) => {
  const cal = ical({
    name: 'Speaker Booking',
  });
  cal.createEvent({
    start: subtractTime(startTime, 5, 30),
    end: subtractTime(endTime, 5, 30),
    summary: summary,
    description: description,
    location: location,
    url: url,
    organizer: {
      name: organizer.name,
      email: organizer.email,
    },
  });
  return cal;
};
