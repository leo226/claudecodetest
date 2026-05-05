import { useState, type KeyboardEvent } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
];

export function AddInput({ onAdd }: Props) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function submit() {
    if (!value.trim()) return;
    onAdd(value, priority);
    setValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submit();
  }

  return (
    <div className="input-row">
      <span className="line-num">+</span>
      <input
        className="add-input"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="添加新任务，按 Enter 提交…"
        maxLength={100}
        autoComplete="off"
      />
      <div className="priority-selector">
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            className={`pri-btn${priority === p.value ? ' active' : ''}`}
            data-pri={p.value}
            onClick={() => setPriority(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <button className="add-btn" onClick={submit} title="添加">
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="6" y1="1" x2="6" y2="11" />
          <line x1="1" y1="6" x2="11" y2="6" />
        </svg>
      </button>
    </div>
  );
}
