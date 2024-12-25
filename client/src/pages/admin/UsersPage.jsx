import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const userData = useQuery(api.users.getAllUsers); // Fetch user data from the API
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

  // Transform and filter user data based on the search query
  const filteredUsers =
    userData
      ?.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((user, index) => ({
        key: index, // Use the index as the key
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked ? "Yes" : "No", // Convert boolean to a readable format
        userId: user.id, // Include the user ID to toggle block state
      })) || [];

  // Function to toggle block state
  const toggleBlock = (userId) => {
    // Call your API to toggle the block state (update the user data)
    console.log(`Toggling block for user ID: ${userId}`);
    // After the update, you may want to refetch or update the UI accordingly
  };

  const userColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Is Blocked?",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (text, record) => (
        <Button
          size="small"
          onClick={() => toggleBlock(record.userId)}
          type={record.isBlocked === "Yes" ? "danger" : "primary"}
        >
          {record.isBlocked === "Yes" ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <Input
        placeholder="Search Users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ marginBottom: "20px" }}
      />
      <Table
        columns={userColumns}
        dataSource={filteredUsers}
        pagination={false}
        bordered
        size="middle"
      />
    </div>
  );
};

export default UsersPage;
