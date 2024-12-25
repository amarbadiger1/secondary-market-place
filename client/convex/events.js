import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    return events;
  },
});

export const getById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    const event = await ctx.db.get(eventId);
    if (!event) return null;

    // Generate image URL if eventPicture exists
    let imageUrl = null;
    if (event.eventPicture) {
      imageUrl = await ctx.storage.getUrl(event.eventPicture);
    }

    return { ...event, imageUrl };
  },
});

export const getSingleEventSchedule = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const schedules = await ctx.db
      .query("schedules")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    return schedules;
  },
});

// one event full details

export const getEventWithDetails = query({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("_id"), args.eventId))
      .first();

    if (!event) return null;

    // Generate image URL if eventPicture exists
    let imageUrl = null;
    if (event.eventPicture) {
      imageUrl = await ctx.storage.getUrl(event.eventPicture);
    }

    const schedules = await ctx.db
      .query("schedules")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect();

    const schedulesWithTickets = await Promise.all(
      schedules.map(async (schedule) => {
        const tickets = await ctx.db
          .query("tickets")
          .filter((q) => q.eq(q.field("scheduleId"), schedule._id))
          .collect();
        return { ...schedule, tickets };
      })
    );

    // Return event details along with image URL and schedules
    return {
      ...event,
      imageUrl,
      schedules: schedulesWithTickets,
    };
  },
});

// This is all events

export const getAllEventsWithDetails = query({
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();

    const eventsWithDetails = await Promise.all(
      events.map(async (event) => {
        const schedules = await ctx.db
          .query("schedules")
          .filter((q) => q.eq(q.field("eventId"), event._id))
          .collect();

        const schedulesWithTickets = await Promise.all(
          schedules.map(async (schedule) => {
            const tickets = await ctx.db
              .query("tickets")
              .filter((q) => q.eq(q.field("scheduleId"), schedule._id))
              .collect();
            return { ...schedule, tickets };
          })
        );

        return { ...event, schedules: schedulesWithTickets };
      })
    );

    return eventsWithDetails;
  },
});

// insert event Details from create event

export const createEvent = mutation({
  args: {
    eventName: v.string(),
    eventDescription: v.string(),
    eventPicture: v.union(v.id("_storage"), v.null()),
    createdBy: v.string(),
    schedules: v.array(
      v.object({
        date: v.string(),
        time: v.string(),
        location: v.string(),
        tickets: v.array(
          v.object({
            type: v.string(),
            price: v.number(),
            totalQuantity: v.number(),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Insert the event
    const eventId = await ctx.db.insert("events", {
      eventName: args.eventName,
      eventDescription: args.eventDescription,
      eventPicture: args.eventPicture,
      createdBy: args.createdBy,
    });

    // Insert schedules and tickets
    for (const schedule of args.schedules) {
      const scheduleId = await ctx.db.insert("schedules", {
        eventId: eventId,
        date: schedule.date,
        time: schedule.time,
        location: schedule.location,
      });

      // Insert tickets for this schedule
      for (const ticket of schedule.tickets) {
        await ctx.db.insert("tickets", {
          scheduleId: scheduleId,
          type: ticket.type,
          price: ticket.price,
          totalQuantity: ticket.totalQuantity,
          soldQuantity: 0, // Initially, no tickets are sold
        });
      }
    }

    return eventId;
  },
});

// new mutation to generate the upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getTicketById = query({
  args: { ticketId: v.id("tickets") },
  handler: async (ctx, args) => {
    const ticket = await ctx.db.get(args.ticketId);

    if (!ticket) {
      return null; // Return null if ticket is not found
    }

    return ticket;
  },
});
