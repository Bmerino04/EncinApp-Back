import { DateTime } from 'luxon';
export function formatTime(date) {
    return DateTime.fromJSDate(date, {zone: 'utc'}).setZone('America/Santiago').toFormat('HH:mm:ss dd/MM/yyyy');
}
