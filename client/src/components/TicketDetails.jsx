import React, { useState } from "react";
import { useQuery } from "convex/react";
import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { Ticket } from "lucide-react";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const ticket = useQuery(api.events.getTicketById, { ticketId });

  const [quantity, setQuantity] = useState(1); // State for ticket quantity

  if (!ticket) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <p>Loading ticket details...</p>
      </div>
    );
  }

  const { type, price, totalQuantity, soldQuantity } = ticket;
  const availableTickets = totalQuantity - soldQuantity;

  const handleQuantityChange = (e) => {
    const value = Math.max(
      1,
      Math.min(availableTickets, parseInt(e.target.value) || 1)
    );
    setQuantity(value);
  };

  const handleBuyNow = () => {
    alert(
      `You have successfully purchased ${quantity} ticket(s) for $${quantity * price}.`
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Ticket Details Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full">
            <Ticket className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {type} Ticket
            </h2>
            <p className="text-sm text-gray-500">Price per ticket: ${price}</p>
            <p className="text-sm text-gray-500">
              Available: {availableTickets}
            </p>
          </div>
        </div>

        {/* Quantity Selection Form */}
        <form className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700">
                Quantity
              </span>
              <input
                type="number"
                min="1"
                max={availableTickets}
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1 block w-full sm:w-32 px-4 py-2 rounded-md border border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              />
            </label>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Total:{" "}
                <span className="text-amber-600"> ₹{quantity * price}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketDetails;
