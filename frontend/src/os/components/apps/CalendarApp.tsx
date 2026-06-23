import { useState } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarApp() {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthName = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Generate calendar day cells
  const dayCells = [];

  // Previous month overflow days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    dayCells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    dayCells.push({
      day: d,
      isCurrentMonth: true,
      isToday
    });
  }

  // Next month overflow days
  const totalCellsSoFar = dayCells.length;
  const remaining = (7 - (totalCellsSoFar % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    dayCells.push({
      day: d,
      isCurrentMonth: false,
      isToday: false
    });
  }

  return (
    <div className="calendar-container" id="cal-container">
      <div className="cal-header">
        <button className="cal-nav" id="cal-prev" onClick={handlePrevMonth}>
          <span className="material-icons-outlined" style={{ fontSize: '18px' }}>
            chevron_left
          </span>
        </button>
        <h3>{monthName}</h3>
        <button className="cal-nav" id="cal-next" onClick={handleNextMonth}>
          <span className="material-icons-outlined" style={{ fontSize: '18px' }}>
            chevron_right
          </span>
        </button>
      </div>

      <div className="cal-grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal-day-name">
            {w}
          </div>
        ))}

        {dayCells.map((cell, idx) => {
          let cellClass = 'cal-day';
          if (!cell.isCurrentMonth) cellClass += ' other-month';
          if (cell.isToday) cellClass += ' today';

          return (
            <div key={`cell-${idx}`} className={cellClass}>
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
