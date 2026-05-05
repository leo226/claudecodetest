import { useMemo } from 'react';

export function Header() {
  const dateStr = useMemo(() => {
    const now = new Date();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日　${weekdays[now.getDay()]}`;
  }, []);

  return (
    <div className="header">
      <div className="header-label">备忘录 / Memo</div>
      <h1>今日<em>待办</em></h1>
      <div className="header-date">{dateStr}</div>
    </div>
  );
}
