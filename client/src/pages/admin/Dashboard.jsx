import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
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

  // Sample data for total counts
  const totalUsers = 3;
  const totalEvents = 3;
  const totalSellers = 5;
  const totalBuyers = 10;

  return (
    <div style={{ padding: "40px" }}>
      <Row gutter={[24, 24]} justify="center">
        {/* Users Count Card */}
        <Col xs={24} md={8} style={{ maxWidth: "30%" }}>
          <Link to="/admin/users">
            <Card>
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h2 style={{ margin: 0 }}>Total Users</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  {totalUsers}
                </p>
              </div>
            </Card>
          </Link>
        </Col>

        {/* Events Count Card */}
        <Col xs={24} md={8} style={{ maxWidth: "30%" }}>
          <Link to="/admin/events">
            <Card>
              <div
                style={{
                  backgroundColor: "#fff7e6",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h2 style={{ margin: 0 }}>Total Events</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  {totalEvents}
                </p>
              </div>
            </Card>
          </Link>
        </Col>

        {/* Sellers Count Card */}
        <Col xs={24} md={8} style={{ maxWidth: "30%" }}>
          <Link to="/admin/sellers">
            <Card>
              <div
                style={{
                  backgroundColor: "#e6ffe6",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h2 style={{ margin: 0 }}>Total Sellers</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  {totalSellers}
                </p>
              </div>
            </Card>
          </Link>
        </Col>

        {/* Buyers Count Card */}
        <Col xs={24} md={8} style={{ maxWidth: "30%" }}>
          <Link to="/admin/buyers">
            <Card>
              <div
                style={{
                  backgroundColor: "#fff0f6",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h2 style={{ margin: 0 }}>Total Buyers</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  {totalBuyers}
                </p>
              </div>
            </Card>
          </Link>
        </Col>

        {/* Create Event Card */}
        <Col xs={24} md={8} style={{ maxWidth: "30%" }}>
          <Link to="/admin/create-event">
            <Card>
              <div
                style={{
                  backgroundColor: "#e6fffb",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h2 style={{ margin: 0 }}>Create Event</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  Click to Create
                </p>
              </div>
            </Card>
          </Link>
        </Col>

        {/* All Purchases Card */}
        <Col xs={24} md={8} style={{ maxWidth: "30%" }}>
          <Link to="/admin/purchases">
            <Card>
              <div
                style={{
                  backgroundColor: "#fff0f6",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <h2 style={{ margin: 0 }}>All Purchases</h2>
                <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  View Details
                </p>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
