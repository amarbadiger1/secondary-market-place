import { useQuery } from "convex/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import Spinner from "./Spinner";

function EventCard({ eventId }) {
  const event = useQuery(api.events.getById, { eventId });
  const navigate = useNavigate();

  // Error handling
  if (event === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  // Show loading spinner until the event data is fetched
  if (!event) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/event/${event._id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden cursor-pointer relative border-gray-100 border transition-all duration-300"
    >
      {/* Event Image */}
      {event.eventPicture && (
        <div className="relative w-full h-48">
          <img
            src={event.imageUrl}
            alt={event.eventName}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Event Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{event.eventName}</h2>
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">
          {event.eventDescription}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
