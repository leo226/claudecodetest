import { useMemo } from 'react';

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
}

export function Header({ dark, onToggleTheme }: Props) {
  const dateStr = useMemo(() => {
    const now = new Date();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日　${weekdays[now.getDay()]}`;
  }, []);

  return (
    <div className="header">
      <div className="header-label">备忘录 / Memo</div>
      <h1>今日<em>待办</em></h1>
      <div className="header-bottom">
        <div className="header-date">{dateStr}</div>
        <button className="theme-btn" onClick={onToggleTheme} title={dark ? '切换浅色模式' : '切换深色模式'}>
          {dark ? (
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1a5 5 0 1 1 0-10A5 5 0 0 1 8 13zM8 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5zM1.5 8.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm10.596-5.39a.5.5 0 0 1 0 .708l-.707.707a.5.5 0 0 1-.707-.707l.707-.708a.5.5 0 0 1 .707 0zm-9.192 9.193a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707-.707l.707-.707a.5.5 0 0 1 .707 0zm9.193.707a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 .707-.707l.707.707a.5.5 0 0 1 0 .707zM3.611 3.11a.5.5 0 0 1 .707 0l.707.708a.5.5 0 1 1-.707.707l-.707-.707a.5.5 0 0 1 0-.708z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
