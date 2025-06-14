
import { type Project, type GetProjectsQuery } from '../schema';

export declare function getProjects(query?: GetProjectsQuery): Promise<Project[]>;
