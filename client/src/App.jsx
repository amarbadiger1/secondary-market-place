import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PurchaseTicket from "./components/PurchaseTicket";
import MyTicket from "./pages/MyTicket";
import SellTicketPage from "./pages/SellTicketPage";
import Dashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/UsersPage";
import EventsPage from "./pages/admin/EventsPage";
import CreateEvent from "./components/CreateEvent";
import SyncUserWithConvex from "./components/SyncUserWithConvex";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import TicketList from "./components/TicketList";
import TicketDetails from "./components/TicketDetails";

function App() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Trigger sync when user is available and loaded
    }
  }, [isLoaded, user]);
  return (
    <div>
      <Router>
        {/* Header outside Routes to show on all pages */}
        {isLoaded && user && <SyncUserWithConvex />}
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path={`/purchase/:eventId/:scheduleId`}
            element={<PurchaseTicket />}
          />
          <Route path={`/event/:eventId`} element={<TicketList />} />
          <Route path={`/sellticket`} element={<SellTicketPage />} />
          <Route path={`/myticket`} element={<MyTicket />} />
          <Route path={`/admin/dashboard`} element={<Dashboard />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/events" element={<EventsPage />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/ticket-details/:ticketId" element={<TicketDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
