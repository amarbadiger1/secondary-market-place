// This component used for ticket selling seller
import React from "react";
import { useNavigate } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const nagivate = useNavigate();
  const handleClik = () => {
    nagivate(`/sell/${ticket.id}`);
  };

  return (
    <div
      className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-xl overflow-hidden max-w-sm mx-auto "
      onClick={handleClik()}
    >
      {/* Ticket Content */}
      <div className="p-4 text-white flex flex-col">
        <div className="flex items-center justify-between">
          {/* Ticket Name */}
          <h3 className="text-xl font-bold">{ticket.name}</h3>
          {/* Ticket Price */}
          <p className="text-lg font-semibold">{ticket.price}</p>
        </div>
        <p className="text-sm mt-2">Ticket ID: {ticket.id}</p>
        <p className="text-sm mt-1">Event Date: {ticket.eventDate}</p>
      </div>

      {/* Ticket Footer with a border for a more ticket-like feel */}
      <div className="bg-white p-2 rounded-b-xl text-gray-800 text-xs font-medium">
        <p>Valid for entry</p>
      </div>
    </div>
  );
};

export default TicketCard;
