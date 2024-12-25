import React, { useState } from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"; // Assuming you have this API file for events

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch events with all details, including schedules and tickets
  const events = useQuery(api.events.getAllEventsWithDetails);

  const { user } = useUser();

  if (!user) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <SignIn mode="modal" />
      </div>
    );
  }

  const role = user.publicMetadata.role;
  if (!role) {
    return <Navigate to="/" />;
  }

  // Process the fetched events to calculate total tickets
  const eventsData = events?.map((event) => {
    // Calculate total tickets across all schedules and tickets
    const totalTickets = event.schedules?.reduce((total, schedule) => {
      return (
        total +
        schedule.tickets?.reduce((sum, ticket) => sum + ticket.totalQuantity, 0)
      );
    }, 0);

    return {
      key: event.id,
      eventName: event.eventName,
      date: event.schedules
        ?.map((schedule) => new Date(schedule.date).toLocaleDateString())
        .join(", "), // Combine dates of all schedules
      location: event.schedules
        ?.map((schedule) => schedule.location)
        .join(", "), // Combine locations of all schedules
      totalTickets, // Total tickets for this event
    };
  });

  const filteredEvents = eventsData?.filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const eventColumns = [
    { title: "Event Name", dataIndex: "eventName", key: "eventName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Total Tickets", dataIndex: "totalTickets", key: "totalTickets" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <Input
        placeholder="Search Events"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ marginBottom: "20px" }}
      />
      <Table
        columns={eventColumns}
        dataSource={filteredEvents}
        pagination={false}
        bordered
        size="middle"
      />
    </div>
  );
};

export default EventsPage;
