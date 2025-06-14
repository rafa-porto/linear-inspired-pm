
import { type Task, type GetTasksQuery } from '../schema';

export declare function getTasks(query?: GetTasksQuery): Promise<Task[]>;
