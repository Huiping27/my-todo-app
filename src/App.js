import React from 'react';
import './App.css';
import Todo from './Todo';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-au'; // Adjust the locale as needed

// Optional: You can import additional CSS for custom styling
import './calendar.css';

function App() {
  const localizer = momentLocalizer(moment);

  return (
    <div className="App">
      <h1>Todo App with Calendar</h1>
      <Todo />
      <Calendar
        localizer={localizer}
        events={[
          // Example events data
          {
            title: 'Meeting',
            start: new Date(2024, 7, 1, 10, 0), // year, month (0-indexed), day, hour, minute
            end: new Date(2024, 7, 1, 12, 0),
          },
          {
            title: 'Birthday Party',
            start: new Date(2024, 7, 2, 12, 0),
            end: new Date(2024, 7, 2, 15, 0),
          },
        ]}
        style={{ height: 500 }} // Adjust the height as needed
      />
    </div>
  );
}

export default App;
