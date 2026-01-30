import { pgTable, uuid, timestamp, pgEnum, varchar, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const eventStatusEnum = pgEnum("event_status", [
    "DRAFT",
    "PUBLISHED",
    "CANCELLED"
]);

export const events = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    description: varchar("description", { length: 1000 }).notNull(),
    date: timestamp("date").notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    capacity: integer("capacity").notNull(),
    price: integer("price").default(0).notNull(),
    status: eventStatusEnum("status").notNull().default("DRAFT"),
    organizerId: uuid("organizer_id")
        .notNull()
        .references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


