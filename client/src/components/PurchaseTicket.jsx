import { useState } from "react";
import { Ticket } from "lucide-react";
import { useUser, SignIn } from "@clerk/clerk-react";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function PurchaseTicket() {
  const { eventId, scheduleId } = useParams(); // Get eventId and scheduleId from URL params
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("5 minutes 30 seconds");
  const [showSignInModal, setShowSignInModal] = useState(false);
  const navigate = useNavigate();

  // Fetch event details including schedules and tickets using the eventId
  const eventDetails = useQuery(api.events.getEventWithDetails, { eventId });

  if (!eventDetails) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p>No event found for the given ID.</p>
      </div>
    );
  }

  const { eventName, schedules } = eventDetails;

  if (!isLoaded) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Filter schedules based on the selected scheduleId
  const selectedSchedule = schedules.find(
    (schedule) => schedule._id === scheduleId
  );

  if (!selectedSchedule) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p>No schedule found for the selected schedule ID.</p>
      </div>
    );
  }

  // Function to handle ticket click and redirect to the ticket details page
  const handleTicketClick = (ticketId) => {
    navigate(`/ticket-details/${ticketId}`);
  };

  return (
    <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Left side - Event image (if available) */}
      <div className="w-1/2 bg-gray-100 rounded-lg h-full">
        {eventDetails.imageUrl && (
          <img
            src={eventDetails.imageUrl}
            alt={eventName}
            className="object-cover w-full h-full rounded-lg"
          />
        )}
      </div>

      {/* Right side - Show ticket types */}
      <div className="w-1/2 pl-8 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Ticket Reserved
                </h3>
                <p className="text-sm text-gray-500">
                  Expires in {timeRemaining}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              A ticket has been reserved for you. Complete your purchase before
              the timer expires to secure your spot at this event.
            </div>
          </div>
        </div>

        {/* Ticket Options for selected schedule */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Available Ticket Types for {eventName}
          </h3>

          {/* Render tickets for the selected schedule */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {selectedSchedule.date} at {selectedSchedule.time} -{" "}
              {selectedSchedule.location}
            </h4>

            {/* Render tickets for the schedule */}
            <div className="space-y-4">
              {selectedSchedule.tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                  onClick={() => handleTicketClick(ticket._id)}
                >
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800">
                      {ticket.type}
                    </h5>
                    <p className="text-sm text-gray-500">
                      Price: ${ticket.price} | Available:{" "}
                      {ticket.totalQuantity - ticket.soldQuantity} tickets left
                    </p>
                  </div>
                  <span className="text-gray-600">${ticket.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Show Sign-In modal if user is not signed in */}
      {showSignInModal && !user && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 "
          onClick={() => setShowSignInModal(false)}
        >
          {/* Clerk's SignIn modal */}
          <SignIn mode="modal" />
        </div>
      )}
    </div>
  );
}
