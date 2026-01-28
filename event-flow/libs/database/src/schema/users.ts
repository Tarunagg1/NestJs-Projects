// import { varchar } from 'drizzle-orm/mysql-core';
import { pgTable, uuid, timestamp, pgEnum, varchar } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['ADMIN', 'USER', 'ORGANIZER']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: uuid('email').notNull().unique(),
    passwordHash: uuid('password_hash').notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    role: roleEnum('role').notNull().default('USER'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});


export type User = typeof users.$inferSelect;
export const NewUser = typeof users.$inferInsert;