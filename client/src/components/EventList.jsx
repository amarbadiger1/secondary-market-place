import React from "react";
import Spinner from "./Spinner";
import { CalendarDays, Ticket } from "lucide-react";
import EventCard from "./EventCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setEvents } from "../redux/features/eventSlice";

function EventList() {
  const events = useQuery(api.events.getAllEventsWithDetails);
  console.log(events);
  const dispatch = useDispatch();

  // Loading state
  if (events === undefined) {
    dispatch(showLoading());
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!events) {
    dispatch(showLoading());
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Data fetching complete
  dispatch(hideLoading());
  dispatch(setEvents(events));

  console.log("All the events", events);

  // Filter upcoming events (events that have not happened yet)
  const upcomingEvents = events
    .filter((event) => new Date(event.schedules[0].date) > Date.now()) // Using the first schedule's date
    .sort(
      (a, b) => new Date(a.schedules[0].date) - new Date(b.schedules[0].date)
    ); // Sorting by schedule date

  // Filter past events (events that have already happened)
  const pastEvents = events
    .filter((event) => new Date(event.schedules[0].date) <= Date.now()) // Using the first schedule's date
    .sort(
      (a, b) => new Date(b.schedules[0].date) - new Date(a.schedules[0].date)
    ); // Sorting by schedule date (descending)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="mt-2 text-gray-600">
            Discover & book tickets for amazing events
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-600">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium">
              {upcomingEvents.length} Upcoming Events
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Events Grid */}
      {upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingEvents.map((event) => (
            <EventCard key={event._id} eventId={event._id} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center mb-12">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No upcoming events
          </h3>
          <p className="text-gray-600 mt-1">Check back later for new events</p>
        </div>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event._id} eventId={event._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default EventList;
