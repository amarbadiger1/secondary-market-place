import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import TicketCard from "../components/TicketCard";

const SellTicketPage = () => {
  // Fetch events using React Query
  const events = useQuery(api.events.getAllEventsWithDetails);

  // Filter upcoming events (events that have not happened yet)
  const upcomingEvents = events?.filter(
    (event) => new Date(event.schedules[0].date) > Date.now() // Using the first schedule's date
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Sell Your Event To Sell Ticket
      </h2>

      {/* Search Bar (for demo, not functional) */}
      <div className="flex justify-center mb-8">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2">search</div>
      </div>

      {/* Ticket List */}
      <div className="space-y-6">
        {upcomingEvents?.map((event) => (
          <TicketCard key={event._id} eventId={event._id} />
        ))}
      </div>
    </div>
  );
};

export default SellTicketPage;
