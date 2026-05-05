import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Todo } from '../types';

const PRI_LABEL: Record<string, string> = { high: '高优先级', medium: '中优先级', low: '低优先级' };

interface Props {
  todo: Todo;
  lineNum: number;
  isRemoving: boolean;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onRemoveStart: (id: number) => void;
  onRemoveEnd: (id: number) => void;
}

export function TodoItem({ todo, lineNum, isRemoving, onToggle, onEdit, onRemoveStart, onRemoveEnd }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function startEdit() {
    if (todo.done) return;
    setDraft(todo.text);
    setEditing(true);
  }

  function commitEdit() {
    if (draft.trim()) onEdit(todo.id, draft);
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') setEditing(false);
  }

  return (
    <li
      className={`todo-item${todo.done ? ' done' : ''}${isRemoving ? ' removing' : ''}${editing ? ' editing' : ''}`}
      onAnimationEnd={() => { if (isRemoving) onRemoveEnd(todo.id); }}
    >
      <span className="line-num">{String(lineNum).padStart(2, '0')}</span>
      <label className="check-area">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className="check-box">
          <svg className="check-mark" viewBox="0 0 8 8" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1,4.5 3.2,6.5 7,2" />
          </svg>
        </span>
      </label>
      <span className="pri-dot" data-pri={todo.priority} title={PRI_LABEL[todo.priority]} />
      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={draft}
          maxLength={100}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="task-text" onDoubleClick={startEdit} title={todo.done ? '' : '双击编辑'}>
          {todo.text}
        </span>
      )}
      <button className="delete-btn" title="删除" onClick={() => onRemoveStart(todo.id)}>×</button>
    </li>
  );
}
