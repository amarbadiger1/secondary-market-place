import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Assuming you have a SearchBar component
import TicketCard from "../components/TicketCard"; // Component to display individual ticket

const SellTicketPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([
    // Dummy data for the sake of illustration
    {
      id: 1,
      name: "Concert A",
      price: "$50",
      // imageUrl: "https://via.placeholder.com/300", // Remove the imageUrl here
    },
    {
      id: 2,
      name: "Event B",
      price: "$40",
      // imageUrl: "https://via.placeholder.com/300", // Remove the imageUrl here
    },
    {
      id: 3,
      name: "Show C",
      price: "$30",
      // imageUrl: "https://via.placeholder.com/300", // Remove the imageUrl here
    },
    // More tickets...
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Sell Your Ticket
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-6">
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center">No tickets found</p>
        ) : (
          filteredTickets.map((ticket) => (
            // <Link to={`/sell/${ticket.id}`} key={ticket.id}>
            //   <TicketCard ticket={ticket} />{" "}
            //   {/* TicketCard will no longer expect an imageUrl */}
            // </Link>
            <TicketCard ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
};

export default SellTicketPage;
