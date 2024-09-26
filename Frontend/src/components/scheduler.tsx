// Scheduler.tsx
import { Scheduler, Day, Week, Month, Agenda } from '@aldabil/react-scheduler';

const appData = [
  {
    id: 1,
    title: 'Breakfast at Flurys',
    start: new Date(2024, 9, 29, 8, 0),
    end: new Date(2024, 9, 29, 9, 0),
  },
  {
    id: 2,
    title: 'Visit Victoria Memorial',
    start: new Date(2024, 9, 29, 9, 30),
    end: new Date(2024, 9, 29, 11, 0),
  },
  {
    id: 3,
    title: 'Lunch at Peter Cat',
    start: new Date(2024, 9, 29, 12, 0),
    end: new Date(2024, 9, 29, 13, 0),
  },
  {
    id: 4,
    title: 'Explore the Indian Museum',
    start: new Date(2024, 9, 29, 13, 30),
    end: new Date(2024, 9, 29, 15, 0),
  },
  {
    id: 5,
    title: 'Ride the Calcutta Tramways',
    start: new Date(2024, 9, 29, 17, 0),
    end: new Date(2024, 9, 29, 18, 0),
  },
  {
    id: 6,
    title: 'Dinner at 6 Ballygunge Place',
    start: new Date(2024, 9, 29, 19, 0),
    end: new Date(2024, 9, 29, 20, 0),
  },
  // Add more events for other days...
];

const SchedulerComponent = () => {
  return (
    <div style={{ margin: '20px' }}>
      <Scheduler
        data={appData}
        defaultView="day"
        views={[Day, Week, Month, Agenda]}
        editable={true}
        eventColor="#007bff"
      />
    </div>
  );
};

export default SchedulerComponent;
