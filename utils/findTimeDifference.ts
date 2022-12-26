export const getDayDifference = (dateTime: string) => {
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const specificDate = new Date(dateTime).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const currentTimeInMilliseconds = new Date(currentTime).getTime();
  const specificDateInMilliseconds = new Date(specificDate).getTime();
  const timeDifference = currentTimeInMilliseconds - specificDateInMilliseconds;
  const dayDifference = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

  return dayDifference;
};

export const getHourDifference = (dateTime: string) => {
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const specificDate = new Date(dateTime).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const currentTimeInMilliseconds = new Date(currentTime).getTime();
  const specificDateInMilliseconds = new Date(specificDate).getTime();
  const timeDifference = currentTimeInMilliseconds - specificDateInMilliseconds;
  const timeDifferenceInHours = Math.floor(timeDifference / 1000 / 60 / 60);

  return timeDifferenceInHours;
};

export const getMinuteDifference = (dateTime: string) => {
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const specificDate = new Date(dateTime).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const currentTimeInMilliseconds = new Date(currentTime).getTime();
  const specificDateInMilliseconds = new Date(specificDate).getTime();
  const timeDifference = currentTimeInMilliseconds - specificDateInMilliseconds;
  const timeDifferenceInMinutes = Math.floor(timeDifference / 1000 / 60);

  return timeDifferenceInMinutes;
};

export const getSecondsDifference = (dateTime: string) => {
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const specificDate = new Date(dateTime).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const currentTimeInMilliseconds = new Date(currentTime).getTime();
  const specificDateInMilliseconds = new Date(specificDate).getTime();
  const timeDifference = currentTimeInMilliseconds - specificDateInMilliseconds;
  const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

  return timeDifferenceInSeconds;
};
