import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { Ticket } from "lucide-react"; // Import Ticket icon from Lucide React
import { Image } from "antd"; // Ant Design Image component
import { api } from "../../convex/_generated/api";

const TicketList = () => {
  const { eventId } = useParams();

  // Fetch event and its schedules using the updated function `getEventWithDetails`
  const eventDetails = useQuery(api.events.getEventWithDetails, { eventId });

  if (!eventDetails) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p>No event found for the given ID.</p>
      </div>
    );
  }

  // Extract event and schedules data from the eventDetails
  const { eventName, schedules } = eventDetails;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Event Image as Banner */}
      <div className="relative mb-8 bg-black/50 flex items-center justify-center">
        <Image
          src={eventDetails.imageUrl}
          alt={eventName}
          height={300}
          className="w-full h-24 rounded-lg shadow-lg"
        />
        <h1 className="absolute inset-x-0 bottom-0 text-center text-xl font-bold text-white bg-black bg-opacity-50 py-2 rounded-md">
          {eventName}
        </h1>
      </div>

      {/* Display tickets for each schedule */}
      {schedules.length > 0 ? (
        <div className="space-y-8">
          {schedules.map((schedule) => {
            return (
              <div
                key={schedule._id}
                className="bg-yellow-100 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-4 border-gray-300"
              >
                {/* Ticket Content - Flexbox Layout */}
                <div className="flex flex-col sm:flex-row items-center sm:gap-0 gap-4 justify-evenly sm:space-x-6">
                  <Ticket className="text-yellow-600 mb-4 sm:mb-0 w-16 h-16" />
                  <div className="flex flex-col items-center text-center sm:text-left">
                    <p className="text-gray-800 text-base mb-2">
                      <strong>Time:</strong> {schedule.time}
                    </p>
                    <p className="text-gray-800 text-base mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(schedule.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {schedule.location.toLocaleUpperCase()}
                    </h2>
                  </div>

                  {/* Buy Ticket Link */}
                  <div className="flex justify-center">
                    <Link
                      to={`/purchase/${eventId}/${schedule._id}`} // Pass both eventId and scheduleId
                      className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
                    >
                      Buy Ticket
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p>No schedules available for this event.</p>
        </div>
      )}
    </div>
  );
};

export default TicketList;
