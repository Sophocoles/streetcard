import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function MyCalendar() {
    const events = [
      {
        title: 'Event 1',
        start: '2023-04-13T10:00:00',
        end: '2023-04-13T12:00:00',
      },
      {
        title: 'Event 2',
        start: '2023-04-15T14:00:00',
        end: '2023-04-15T16:00:00',
      },
    ];
  
    return (
        <div className='clientCalendar'>
            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events} />
        </div>
    );
}

export default MyCalendar;