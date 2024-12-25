import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook for authentication
import { useMutation } from "convex/react"; // Import Convex mutation hook
import { api } from "../../convex/_generated/api";

export default function SyncUserWithConvex() {
  const { user } = useUser(); // Get the authenticated user from Clerk
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const updateUser = useMutation(api.users.updateUser); // Convex mutation for updating user data

  useEffect(() => {
    if (!user) {
      setIsLoading(true); // User not authenticated, set loading to true
      return;
    }

    // Once we have the user data from Clerk, set loading to false
    setIsLoading(false);

    const syncUser = async () => {
      const { id, firstName, lastName, emailAddresses } = user;
      try {
        // Call the Convex mutation to update user data
        await updateUser({
          userId: id,
          name: `${firstName ?? ""} ${lastName ?? ""}`.trim(),
          email: emailAddresses[0]?.emailAddress ?? "",
        });
        console.log("User synced successfully");
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser(); // Sync the user once the data is available
  }, [user, updateUser]); // Re-run the effect if the user data changes

  if (isLoading) {
    return null; // Show loading state until the user data is available
  }

  return null;
}
