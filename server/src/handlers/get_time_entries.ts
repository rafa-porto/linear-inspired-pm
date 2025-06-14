
import { type TimeEntry, type GetTimeEntriesQuery } from '../schema';

export declare function getTimeEntries(query?: GetTimeEntriesQuery): Promise<TimeEntry[]>;
