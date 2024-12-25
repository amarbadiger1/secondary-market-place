import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserbyId = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();
    return user;
  },
});

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { userId, name, email }) => {
    //Check if User Exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();
    if (existingUser) {
      //update Existing User
      await ctx.db.patch(existingUser._id, { name, email });
      return existingUser._id;
    }

    //Create New User
    const newUserId = await ctx.db.insert("users", {
      userId,
      name,
      email,
      isAdmin: false,
      isBlocked: false,
    });

    return newUserId;
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});
