export function extractDateTime(isoString, timeZone = 'Asia/Karachi') {
  const d = new Date(isoString);

  const date = new Intl.DateTimeFormat('en-CA', { // YYYY-MM-DD
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(d);

  const time = new Intl.DateTimeFormat('en-GB', { // 24h HH:MM:SS
    timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(d);

  return date;
}

