import React from 'react';
import Todo from './Todo';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

function App() {
  const events = [
    {
      title: 'Meeting',
      start: new Date(2024, 6, 16, 10, 0),
      end: new Date(2024, 6, 16, 12, 0),
    },
    {
      title: 'Lunch',
      start: new Date(2024, 6, 17, 12, 0),
      end: new Date(2024, 6, 17, 13, 0),
      desc: 'Lunch with team',
    },
  ];

  return (
    <div className="App">
      <div className="todo-container">
        <Todo />
      </div>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
}

export default App;

