export type Priority = 'high' | 'medium' | 'low';
export type Filter = 'all' | 'pending' | 'done';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
  created: number;
}
