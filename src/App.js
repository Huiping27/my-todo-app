import React, { useState } from 'react';
import './App.css';
import Todo from './Todo';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-au'; 
import './calendar.css'; // Ensure this file exists in the correct location
import DnDContext from './DnDContext';
import { useDrop } from 'react-dnd';

const App = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meeting',
      start: new Date(2024, 7, 1, 10, 0),
      end: new Date(2024, 7, 1, 12, 0),
    },
    {
      id: 2,
      title: 'Birthday Party',
      start: new Date(2024, 7, 2, 12, 0),
      end: new Date(2024, 7, 2, 15, 0),
    },
  ]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const eventStart = new Date();
      eventStart.setHours(offset.x / 10, 0, 0, 0); // Simple logic to calculate time
      const eventEnd = new Date(eventStart);
      eventEnd.setHours(eventStart.getHours() + 1);

      const newEvent = {
        id: events.length + 1,
        title: item.task.title,
        start: eventStart,
        end: eventEnd,
      };
      setEvents([...events, newEvent]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <DnDContext>
      <div className="App">
        <h1>Todo App with Calendar</h1>
        <Todo />
        <div ref={drop} style={{ height: 500, position: 'relative' }}>
          <Calendar
            localizer={localizer}
            events={events}
            onSelectEvent={(event) => console.log('Event selected:', event)}
            style={{ height: '100%' }}
          />
          {isOver && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 1,
              }}
            />
          )}
        </div>
      </div>
    </DnDContext>
  );
};

export default App;

