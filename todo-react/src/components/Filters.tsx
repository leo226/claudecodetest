import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
}

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '进行中' },
  { value: 'done', label: '已完成' },
];

export function Filters({ filter, onChange }: Props) {
  return (
    <div className="filters">
      {OPTIONS.map(opt => (
        <button
          key={opt.value}
          className={`filter-btn${filter === opt.value ? ' active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
