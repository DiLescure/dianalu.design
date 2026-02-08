import dayjs from '@/util/dayjs';

export function startOfDate(date?: Date, timeZone?: string): Date {
  const tz = timeZone ?? dayjs.tz.guess();

  if (!date) {
    return dayjs().tz(tz).startOf('day').toDate();
  }

  return dayjs(date).tz(tz).startOf('day').toDate();
}

export function endOfDate(date?: Date, timeZone?: string): Date {
  const tz = timeZone ?? dayjs.tz.guess();

  if (!date) {
    return dayjs().tz(tz).endOf('day').toDate();
  }

  return dayjs(date).tz(tz).endOf('day').toDate();
}
