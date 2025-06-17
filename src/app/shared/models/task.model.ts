export interface Task {
    id?: number;
    title: string;
    description?: string;
    dueDate?: Date;
    status?: number;
    priority?: TaskPriority;
    userId?: string;
  }
  export enum TaskPriority {
    Low = '🟢',
    Medium = '🟡',
    High = '🔴'
  }
  