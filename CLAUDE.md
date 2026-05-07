# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from `todo-react/`. Node is installed at `/opt/homebrew/bin/node` — prefix commands with `export PATH="/opt/homebrew/bin:$PATH"` if `npm` is not found.

```bash
cd todo-react
npm run dev      # 启动开发服务器，访问 http://localhost:5173
npm run build    # TypeScript 编译 + Vite 生产构建
npm run lint     # ESLint 检查
npm run preview  # 预览生产构建
```

## Architecture

There are two independent implementations sharing no code:

- **`todo.html`** — 单文件纯 HTML/CSS/JS 版本，可直接在浏览器打开，无需构建
- **`todo-react/`** — React + TypeScript + Vite 工程化版本

### React 版数据流

所有状态集中在两个 hook，组件只负责渲染：

- **`useTodos`** (`src/hooks/useTodos.ts`) — todo 数据的唯一数据源。管理 `todos`、`filter`、`removingIds`，并自动同步到 `localStorage`（key: `todos_v1` 和 `nextId`）。暴露 `addTodo`、`editTodo`、`toggleTodo`、`startRemove`、`confirmRemove`、`setFilter`。
- **`useDarkMode`** (`src/hooks/useDarkMode.ts`) — 读取 `localStorage` 和 `prefers-color-scheme` 初始化，通过 `document.documentElement` 上的 `data-theme` 属性切换主题。

### 删除动画机制

删除分两步以支持 CSS 退场动画：
1. `startRemove(id)` — 将 id 加入 `removingIds`，`TodoItem` 据此添加 `.removing` class，触发 CSS 动画
2. `confirmRemove(id)` — 在 `TodoItem` 的 `onAnimationEnd` 回调中调用，真正从 state 中移除

### CSS 主题

`src/index.css` 定义 CSS 变量（`--ink`、`--paper`、`--accent` 等），深色模式通过 `[data-theme="dark"]` 选择器覆盖这些变量。`src/App.css` 只使用这些变量，无硬编码颜色（优先级圆点除外：`#b5432a` 高、`#c47a2a` 中）。

### localStorage 数据格式

```ts
// key: "todos_v1"
Todo[] // 旧数据缺少 priority 字段时，useTodos 加载时自动补填 "medium"

// key: "nextId"
string // 自增 ID 计数器
```
