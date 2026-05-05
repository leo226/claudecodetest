import type { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  removingIds: Set<number>;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onRemoveStart: (id: number) => void;
  onRemoveEnd: (id: number) => void;
}

export function TodoList({ todos, removingIds, onToggle, onEdit, onRemoveStart, onRemoveEnd }: Props) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>— 此处空空如也 —</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, idx) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          lineNum={idx + 1}
          isRemoving={removingIds.has(todo.id)}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemoveStart={onRemoveStart}
          onRemoveEnd={onRemoveEnd}
        />
      ))}
    </ul>
  );
}
