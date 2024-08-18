import ical from 'ical-generator';

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
    start: startTime,
    end: endTime,
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
