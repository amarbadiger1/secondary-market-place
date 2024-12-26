import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignIn, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const CreateEvent = () => {
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);
  const createEvent = useMutation(api.events.createEvent);

  const { user } = useUser();

  if (!user) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 ">
        {/* Clerk's SignIn modal */}
        <SignIn mode="modal" />
      </div>
    );
  }
  const role = user.publicMetadata.role;
  console.log(user.publicMetadata.role);
  if (!role) {
    return <Navigate to="/" />;
  }
  const [schedules, setSchedules] = useState([
    {
      date: "",
      time: "",
      location: "",
      tickets: [{ type: "", price: 0, totalQuantity: 0 }],
    },
  ]);
  const [eventPic, setEventPic] = useState(null);

  const { id } = user;

  const onFinish = async (e) => {
    e.preventDefault();
    const eventData = {
      eventName: e.target.eventName.value,
      eventDescription: e.target.eventDescription.value,
      createdBy: id,
      schedules: schedules,
    };

    // Handle image upload and event creation
    if (eventPic) {
      const imageFile = eventPic;
      const eventId = await handleCreateEvent(eventData, imageFile);
      toast.success("Event created successfully!");
    } else {
      toast.error("Please upload an event image.");
    }
  };

  // Handle image upload
  const handleEventPicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setEventPic(file); // Save the image file for later upload
    }
  };

  const handleCreateEvent = async (eventData, imageFile) => {
    // Step 1: Generate upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: Upload the image
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": imageFile.type },
      body: imageFile,
    });

    const { storageId } = await result.json();

    // Step 3: Create the event
    const eventId = await createEvent({
      ...eventData,
      eventPicture: storageId, // Use the storageId for the image
    });

    return eventId;
  };

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      {
        date: "",
        time: "",
        location: "",
        tickets: [{ type: "", price: "", totalQuantity: "" }],
      },
    ]);
  };

  const removeSchedule = (index) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  const addTicket = (scheduleIndex) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[scheduleIndex].tickets.push({
      type: "",
      price: "",
      totalQuantity: "",
    });
    setSchedules(updatedSchedules);
  };

  const removeTicket = (scheduleIndex, ticketIndex) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[scheduleIndex].tickets = updatedSchedules[
      scheduleIndex
    ].tickets.filter((_, i) => i !== ticketIndex);
    setSchedules(updatedSchedules);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][field] = value;
    setSchedules(updatedSchedules);
  };

  const handleTicketChange = (scheduleIndex, ticketIndex, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[scheduleIndex].tickets[ticketIndex][field] = value;
    setSchedules(updatedSchedules);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Event
      </h1>
      <form onSubmit={onFinish}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Event Name
          </label>
          <input
            type="text"
            name="eventName"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Event Description
          </label>
          <textarea
            name="eventDescription"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Event Picture
          </label>
          <input
            type="file"
            onChange={handleEventPicChange}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {eventPic && (
            <img
              src={URL.createObjectURL(eventPic)}
              alt="Event Preview"
              className="w-full mt-4 rounded-lg"
            />
          )}
        </div>

        <div>
          <h3 className="text-xl font-medium text-gray-800 mb-4">Schedules</h3>
          {schedules.map((schedule, scheduleIndex) => (
            <div
              key={scheduleIndex}
              className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={schedule.date}
                    onChange={(e) =>
                      handleScheduleChange(
                        scheduleIndex,
                        "date",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={schedule.time}
                    onChange={(e) =>
                      handleScheduleChange(
                        scheduleIndex,
                        "time",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={schedule.location}
                  onChange={(e) =>
                    handleScheduleChange(
                      scheduleIndex,
                      "location",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Tickets
              </h4>
              {schedule.tickets.map((ticket, ticketIndex) => (
                <div
                  key={ticketIndex}
                  className="bg-white p-4 rounded-lg shadow-sm mb-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Type
                      </label>
                      <input
                        type="text"
                        value={ticket.type}
                        onChange={(e) =>
                          handleTicketChange(
                            scheduleIndex,
                            ticketIndex,
                            "type",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) =>
                          handleTicketChange(
                            scheduleIndex,
                            ticketIndex,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Total Quantity
                      </label>
                      <input
                        type="number"
                        value={ticket.totalQuantity}
                        onChange={(e) =>
                          handleTicketChange(
                            scheduleIndex,
                            ticketIndex,
                            "totalQuantity",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTicket(scheduleIndex, ticketIndex)}
                    className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove Ticket
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTicket(scheduleIndex)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Ticket
              </button>

              <button
                type="button"
                onClick={() => removeSchedule(scheduleIndex)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove Schedule
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSchedule}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Schedule
          </button>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
