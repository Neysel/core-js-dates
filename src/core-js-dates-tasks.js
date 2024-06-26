/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const Ddate = new Date(date);
  return Ddate.valueOf();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const OurDate = new Date(date);

  const hh = OurDate.getHours().toString().padStart(2, '0');
  const mm = OurDate.getMinutes().toString().padStart(2, '0');
  const ss = OurDate.getSeconds().toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const OurDate = new Date(date);
  const day = OurDate.getUTCDay();
  let result;
  switch (day) {
    case 0:
      result = 'Sunday';
      break;
    case 1:
      result = 'Monday';
      break;
    case 2:
      result = 'Tuesday';
      break;
    case 3:
      result = 'Wednesday';
      break;
    case 4:
      result = 'Thursday';
      break;
    case 5:
      result = 'Friday';
      break;
    case 6:
      result = 'Saturday';
      break;
    default:
      result = '';
      break;
  }
  return result;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const OurDate = new Date(date);
  const day = OurDate.getUTCDay();
  let nextDate;
  switch (day) {
    case 0:
      nextDate = 5;
      break;
    case 1:
      nextDate = 4;
      break;
    case 2:
      nextDate = 3;
      break;
    case 3:
      nextDate = 2;
      break;
    case 4:
      nextDate = 1;
      break;
    case 5:
      nextDate = 7;
      break;
    case 6:
      nextDate = 6;
      break;
    default:
      nextDate = '';
      break;
  }
  OurDate.setDate(OurDate.getDate() + nextDate);
  return OurDate;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const date1 = new Date(dateStart);
  const date2 = new Date(dateEnd);
  const diffTime = Math.abs(date2 - date1);
  const result = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return result;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const dateToCompare = new Date(date);
  const date1 = new Date(period.start);
  const date2 = new Date(period.end);

  let result = false;

  if (dateToCompare <= date2 && dateToCompare >= date1) {
    result = true;
  }
  return result;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const OurDate = new Date(date);

  const M = OurDate.getMonth() + 1;
  const D = OurDate.getUTCDate();
  const Y = OurDate.getFullYear();

  const hhTwentyFour = OurDate.getUTCHours();
  let hh;
  const mm = OurDate.getUTCMinutes().toString().padStart(2, '0');
  const ss = OurDate.getUTCSeconds().toString().padStart(2, '0');

  let a;
  if (hhTwentyFour < 12) {
    hh = hhTwentyFour;
    a = 'AM';
  } else if (hhTwentyFour === 12) {
    a = 'PM';
    hh = hhTwentyFour;
  } else {
    a = 'PM';
    hh = hhTwentyFour - 12;
  }

  const result = `${M}/${D}/${Y}, ${hh}:${mm}:${ss} ${a}`;
  return result;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  let counterWeekend = 0;
  const OurDate = new Date(year, month, 0);
  const datesInMonth = OurDate.getDate();
  for (let i = 1; i <= datesInMonth; i += 1) {
    const tempDate = new Date(year, month - 1, i);
    if (tempDate.getDay() === 0 || tempDate.getDay() === 6) {
      counterWeekend += 1;
    }
  }
  return counterWeekend;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const OurDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const januaryFirst = new Date(Date.UTC(OurDate.getUTCFullYear(), 0, 1));
  let daysToNextMonday;
  if (januaryFirst.getDay() === 1) {
    daysToNextMonday = 0;
  } else if (januaryFirst.getDay() === 0) {
    daysToNextMonday = 1;
  } else {
    daysToNextMonday = 7 - januaryFirst.getDay();
  }

  const nextMonday = new Date(
    Date.UTC(
      OurDate.getUTCFullYear(),
      0,
      januaryFirst.getDate() + daysToNextMonday
    )
  );

  let result;
  if (OurDate < nextMonday) {
    result = 1;
  } else if (daysToNextMonday === 0) {
    result = Math.ceil((OurDate - nextMonday) / (24 * 3600 * 1000) / 7);
  } else if (daysToNextMonday === 1) {
    result =
      Math.ceil(((OurDate - nextMonday) / (24 * 3600 * 1000) + 1) / 7) + 1;
  } else {
    result = Math.ceil((OurDate - nextMonday) / (24 * 3600 * 1000) / 7) + 1;
  }
  return result;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const ourDate = new Date(date);

  let yearOfDate = ourDate.getFullYear();
  let monthDate = ourDate.getMonth();
  let newTempDate = new Date(yearOfDate, monthDate, 13);
  let resultFlag = false;

  do {
    if (newTempDate.getDay() === 5 && newTempDate.getDate() === 13) {
      resultFlag = true;
    } else {
      if (monthDate < 11) {
        monthDate += 1;
      } else {
        yearOfDate += 1;
      }

      newTempDate = new Date(yearOfDate, monthDate, 13);
    }
  } while (resultFlag === false);
  return newTempDate;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const ourDate = new Date(date);
  const m = ourDate.getMonth();
  let result = 0;

  switch (m) {
    case 0:
    case 1:
    case 2:
      result = 1;
      break;
    case 3:
    case 4:
    case 5:
      result = 2;
      break;
    case 6:
    case 7:
    case 8:
      result = 3;
      break;
    case 9:
    case 10:
    case 11:
      result = 4;
      break;
    default:
      result = 1;
      break;
  }

  return result;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  function dateFromDDMMYYYY(string) {
    const arrayElements = string.split('-');
    const stringResult = `${arrayElements[2]}-${arrayElements[1]}-${arrayElements[0]}`;
    return new Date(stringResult);
  }
  const startDate = dateFromDDMMYYYY(period.start);
  const endDate = dateFromDDMMYYYY(period.end);

  const oneDay = 86400000;

  function toDDMMYYY(date) {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    return `${newDate.getDate().toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${newDate.getFullYear()}`;
  }

  const days = [];

  let tempDate = startDate;

  do {
    for (let i = 0; i < countWorkDays; i += 1) {
      days.push(toDDMMYYY(tempDate));
      if (tempDate.valueOf() === endDate.valueOf()) {
        break;
      }
      tempDate = new Date(tempDate.valueOf() + oneDay);
    }

    for (let j = 0; j < countOffDays; j += 1) {
      if (tempDate.valueOf() === endDate.valueOf()) {
        break;
      }
      tempDate = new Date(tempDate.valueOf() + oneDay);
      if (tempDate.valueOf() === endDate.valueOf() && j === countOffDays - 1) {
        days.push(toDDMMYYY(tempDate));
      }
    }
  } while (tempDate.valueOf() < endDate.valueOf());
  return days;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  let result = false;

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    result = true;
  }
  return result;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
