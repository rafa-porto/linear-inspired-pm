
import { serial, text, pgTable, timestamp, integer, pgEnum, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'project_manager', 'team_member']);
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'in_review', 'done', 'cancelled']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);
export const projectStatusEnum = pgEnum('project_status', ['planning', 'active', 'on_hold', 'completed', 'cancelled']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatar_url: text('avatar_url'),
  role: userRoleEnum('role').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Teams table
export const teamsTable = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Team members table (junction table)
export const teamMembersTable = pgTable('team_members', {
  id: serial('id').primaryKey(),
  team_id: integer('team_id').notNull().references(() => teamsTable.id),
  user_id: integer('user_id').notNull().references(() => usersTable.id),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Projects table
export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: projectStatusEnum('status').notNull(),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  team_id: integer('team_id').references(() => teamsTable.id),
  created_by: integer('created_by').notNull().references(() => usersTable.id),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Tasks table
export const tasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').notNull(),
  priority: taskPriorityEnum('priority').notNull(),
  due_date: timestamp('due_date'),
  assignee_id: integer('assignee_id').references(() => usersTable.id),
  project_id: integer('project_id').notNull().references(() => projectsTable.id),
  created_by: integer('created_by').notNull().references(() => usersTable.id),
  estimated_hours: numeric('estimated_hours', { precision: 10, scale: 2 }),
  actual_hours: numeric('actual_hours', { precision: 10, scale: 2 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Time entries table
export const timeEntriesTable = pgTable('time_entries', {
  id: serial('id').primaryKey(),
  task_id: integer('task_id').notNull().references(() => tasksTable.id),
  user_id: integer('user_id').notNull().references(() => usersTable.id),
  hours: numeric('hours', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Workflows table
export const workflowsTable = pgTable('workflows', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  project_id: integer('project_id').notNull().references(() => projectsTable.id),
  created_by: integer('created_by').notNull().references(() => usersTable.id),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  createdProjects: many(projectsTable),
  assignedTasks: many(tasksTable),
  createdTasks: many(tasksTable),
  teamMemberships: many(teamMembersTable),
  timeEntries: many(timeEntriesTable),
  createdWorkflows: many(workflowsTable),
}));

export const teamsRelations = relations(teamsTable, ({ many }) => ({
  members: many(teamMembersTable),
  projects: many(projectsTable),
}));

export const teamMembersRelations = relations(teamMembersTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [teamMembersTable.team_id],
    references: [teamsTable.id],
  }),
  user: one(usersTable, {
    fields: [teamMembersTable.user_id],
    references: [usersTable.id],
  }),
}));

export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
  team: one(teamsTable, {
    fields: [projectsTable.team_id],
    references: [teamsTable.id],
  }),
  creator: one(usersTable, {
    fields: [projectsTable.created_by],
    references: [usersTable.id],
  }),
  tasks: many(tasksTable),
  workflows: many(workflowsTable),
}));

export const tasksRelations = relations(tasksTable, ({ one, many }) => ({
  project: one(projectsTable, {
    fields: [tasksTable.project_id],
    references: [projectsTable.id],
  }),
  assignee: one(usersTable, {
    fields: [tasksTable.assignee_id],
    references: [usersTable.id],
  }),
  creator: one(usersTable, {
    fields: [tasksTable.created_by],
    references: [usersTable.id],
  }),
  timeEntries: many(timeEntriesTable),
}));

export const timeEntriesRelations = relations(timeEntriesTable, ({ one }) => ({
  task: one(tasksTable, {
    fields: [timeEntriesTable.task_id],
    references: [tasksTable.id],
  }),
  user: one(usersTable, {
    fields: [timeEntriesTable.user_id],
    references: [usersTable.id],
  }),
}));

export const workflowsRelations = relations(workflowsTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [workflowsTable.project_id],
    references: [projectsTable.id],
  }),
  creator: one(usersTable, {
    fields: [workflowsTable.created_by],
    references: [usersTable.id],
  }),
}));

// Export all tables for relation queries
export const tables = {
  users: usersTable,
  teams: teamsTable,
  teamMembers: teamMembersTable,
  projects: projectsTable,
  tasks: tasksTable,
  timeEntries: timeEntriesTable,
  workflows: workflowsTable,
};
