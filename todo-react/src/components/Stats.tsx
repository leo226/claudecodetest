interface Props {
  total: number;
  pending: number;
  done: number;
}

export function Stats({ total, pending, done }: Props) {
  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-num">{total}</span>
        <span className="stat-label">全部</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-num">{pending}</span>
        <span className="stat-label">待完成</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-num">{done}</span>
        <span className="stat-label">已完成</span>
      </div>
    </div>
  );
}
