// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../convex/_generated/api";
// import { useQuery } from "convex/react";

// const TicketCard = ({ eventId }) => {
//   const {
//     data: event,
//     isLoading,
//     error,
//   } = useQuery(api.events.getById, { eventId });
//   const navigate = useNavigate();

//   const handleClick = () => {
//     // navigate(`/sell/${ticket.id}`);
//   };

//   // Show loading state or error message
//   if (isLoading) {
//     return (
//       <div className="bg-gray-200 border-4 border-gray-300 rounded-lg shadow-md p-4 w-full sm:w-3/4 lg:w-1/2 mx-auto cursor-pointer">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border-4 border-red-500 rounded-lg shadow-md p-4 w-full sm:w-3/4 lg:w-1/2 mx-auto cursor-pointer">
//         <p>Error loading event</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="bg-yellow-100 border-4 border-gray-300 rounded-lg shadow-md p-4 w-full sm:w-3/4 lg:w-1/2 mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300"
//       onClick={handleClick}
//     >
//       {/* Ticket Header */}
//       <div className="text-gray-800">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-bold">{event.eventName}</h3>
//         </div>
//         <p className="text-sm mt-2">{event.eventDescription}</p>
//       </div>
//     </div>
//   );
// };

// export default TicketCard;

import React from "react";

const TicketCard = () => {
  return <div>TicketCard</div>;
};

export default TicketCard;
