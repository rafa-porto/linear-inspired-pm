
import { z } from 'zod';

// Enums
export const userRoleSchema = z.enum(['admin', 'project_manager', 'team_member']);
export const taskStatusSchema = z.enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled']);
export const taskPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);
export const projectStatusSchema = z.enum(['planning', 'active', 'on_hold', 'completed', 'cancelled']);

// User schemas
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  role: userRoleSchema,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  avatar_url: z.string().url().nullable(),
  role: userRoleSchema
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  avatar_url: z.string().url().nullable().optional(),
  role: userRoleSchema.optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

// Team schemas
export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Team = z.infer<typeof teamSchema>;

export const createTeamInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable()
});

export type CreateTeamInput = z.infer<typeof createTeamInputSchema>;

export const updateTeamInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional()
});

export type UpdateTeamInput = z.infer<typeof updateTeamInputSchema>;

// Project schemas
export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  status: projectStatusSchema,
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  team_id: z.number().nullable(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Project = z.infer<typeof projectSchema>;

export const createProjectInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  status: projectStatusSchema,
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  team_id: z.number().nullable(),
  created_by: z.number()
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const updateProjectInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: projectStatusSchema.optional(),
  start_date: z.coerce.date().nullable().optional(),
  end_date: z.coerce.date().nullable().optional(),
  team_id: z.number().nullable().optional()
});

export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

// Task schemas
export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  due_date: z.coerce.date().nullable(),
  assignee_id: z.number().nullable(),
  project_id: z.number(),
  created_by: z.number(),
  estimated_hours: z.number().nullable(),
  actual_hours: z.number().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Task = z.infer<typeof taskSchema>;

export const createTaskInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  due_date: z.coerce.date().nullable(),
  assignee_id: z.number().nullable(),
  project_id: z.number(),
  created_by: z.number(),
  estimated_hours: z.number().positive().nullable()
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export const updateTaskInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  due_date: z.coerce.date().nullable().optional(),
  assignee_id: z.number().nullable().optional(),
  estimated_hours: z.number().positive().nullable().optional(),
  actual_hours: z.number().positive().nullable().optional()
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

// Team member schemas
export const teamMemberSchema = z.object({
  id: z.number(),
  team_id: z.number(),
  user_id: z.number(),
  created_at: z.coerce.date()
});

export type TeamMember = z.infer<typeof teamMemberSchema>;

export const addTeamMemberInputSchema = z.object({
  team_id: z.number(),
  user_id: z.number()
});

export type AddTeamMemberInput = z.infer<typeof addTeamMemberInputSchema>;

export const removeTeamMemberInputSchema = z.object({
  team_id: z.number(),
  user_id: z.number()
});

export type RemoveTeamMemberInput = z.infer<typeof removeTeamMemberInputSchema>;

// Time tracking schemas
export const timeEntrySchema = z.object({
  id: z.number(),
  task_id: z.number(),
  user_id: z.number(),
  hours: z.number(),
  description: z.string().nullable(),
  date: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type TimeEntry = z.infer<typeof timeEntrySchema>;

export const createTimeEntryInputSchema = z.object({
  task_id: z.number(),
  user_id: z.number(),
  hours: z.number().positive(),
  description: z.string().nullable(),
  date: z.coerce.date()
});

export type CreateTimeEntryInput = z.infer<typeof createTimeEntryInputSchema>;

export const updateTimeEntryInputSchema = z.object({
  id: z.number(),
  hours: z.number().positive().optional(),
  description: z.string().nullable().optional(),
  date: z.coerce.date().optional()
});

export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntryInputSchema>;

// Workflow schemas
export const workflowSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  project_id: z.number(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Workflow = z.infer<typeof workflowSchema>;

export const createWorkflowInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  project_id: z.number(),
  created_by: z.number()
});

export type CreateWorkflowInput = z.infer<typeof createWorkflowInputSchema>;

export const updateWorkflowInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional()
});

export type UpdateWorkflowInput = z.infer<typeof updateWorkflowInputSchema>;

// Query parameter schemas
export const getTasksQuerySchema = z.object({
  project_id: z.number().optional(),
  assignee_id: z.number().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional()
});

export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>;

export const getProjectsQuerySchema = z.object({
  team_id: z.number().optional(),
  status: projectStatusSchema.optional(),
  created_by: z.number().optional()
});

export type GetProjectsQuery = z.infer<typeof getProjectsQuerySchema>;

export const getTimeEntriesQuerySchema = z.object({
  task_id: z.number().optional(),
  user_id: z.number().optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional()
});

export type GetTimeEntriesQuery = z.infer<typeof getTimeEntriesQuerySchema>;

// ID parameter schemas
export const idParamSchema = z.object({
  id: z.number()
});

export type IdParam = z.infer<typeof idParamSchema>;
