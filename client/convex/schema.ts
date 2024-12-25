import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), // Unique identifier for the user
    name: v.string(), // User's name
    email: v.string(), // User's email
    isAdmin: v.boolean(), // Role of the user (e.g., "admin", "user")
    isBlocked: v.boolean(), // Whether the user is blocked by admin
  })
    .index("by_user_id", ["userId"])
    .index("by_email", ["email"]),

  events: defineTable({
    eventName: v.string(), // Name of the event
    eventDescription: v.string(), // Description of the event
    eventPicture: v.union(v.string(), v.null()), // URL or path to the event picture
    createdBy: v.string(), // User ID of the creator (admin or user)
  }),
  schedules: defineTable({
    eventId: v.string(), // Foreign key linking to the events table
    date: v.string(), // Date of the schedule in ISO format
    time: v.string(), // Time of the schedule in HH:mm format
    location: v.string(), // Location of the event
  }),
  tickets: defineTable({
    scheduleId: v.string(), // Foreign key linking to the schedules table
    type: v.string(), // Ticket type (e.g., General, VIP, Custom)
    price: v.number(), // Price of the ticket
    totalQuantity: v.number(), // Total number of tickets available
    soldQuantity: v.number(), // Number of tickets sold
  }),

  transactions: defineTable({
    eventId: v.id("events"), // Event ID for which the ticket is being bought/sold
    ticketId: v.number(), // Index of the ticket type in the event's tickets array
    buyerId: v.id("users"), // User ID of the buyer
    sellerId: v.union(v.id("users"), v.null()), // User ID of the seller (null if it's an admin sale)
    status: v.string(), // Transaction status (e.g., "pending", "approved", "rejected")
    quantity: v.number(), // Quantity of tickets being bought/sold
    totalPrice: v.number(), // Total price of the transaction
    razorpayOrderId: v.string(), // Razorpay order ID
    razorpayPaymentId: v.union(v.string(), v.null()), // Razorpay payment ID (null if not yet completed)
    razorpaySignature: v.union(v.string(), v.null()), // Razorpay signature for payment verification
    paymentStatus: v.string(), // Payment status (e.g., "initiated", "successful", "failed", "refunded")
  })
    .index("by_event_id", ["eventId"])
    .index("by_buyer_id", ["buyerId"])
    .index("by_seller_id", ["sellerId"]),
});
