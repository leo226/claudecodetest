# 备忘录 · Todo App

一个具有纸质笔记本风格的待办事项应用，提供单文件 HTML 版本和 React + TypeScript + Vite 工程化版本。

![界面预览](https://img.shields.io/badge/设计风格-纸质笔记本-b5432a) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Vite](https://img.shields.io/badge/Vite-8-646cff)

## 功能

- **添加任务** — 输入后按 `Enter` 或点击 `+` 按钮
- **编辑任务** — 双击任务文字进入内联编辑，`Enter` 保存，`Escape` 取消
- **完成/取消** — 点击左侧复选框切换状态
- **优先级** — 添加时选择高 / 中 / 低，列表中以彩色圆点标示
- **状态筛选** — 全部 / 进行中 / 已完成
- **数据持久化** — 使用 `localStorage` 保存，刷新不丢失

## 项目结构

```
.
├── todo.html              # 单文件版本（无需构建，直接浏览器打开）
└── todo-react/            # React 工程化版本
    ├── index.html
    ├── vite.config.ts
    └── src/
        ├── types.ts                   # Todo / Filter / Priority 类型定义
        ├── hooks/
        │   └── useTodos.ts            # 状态管理 + localStorage
        └── components/
            ├── Header.tsx             # 标题与日期
            ├── Stats.tsx              # 任务统计
            ├── Filters.tsx            # 筛选按钮
            ├── AddInput.tsx           # 输入框与优先级选择
            ├── TodoList.tsx           # 列表容器
            └── TodoItem.tsx           # 单条任务（含内联编辑）
```

## 快速开始

### 单文件版本

直接用浏览器打开 `todo.html`，无需任何依赖。

### React 版本

```bash
cd todo-react
npm install
npm run dev
```

浏览器访问 `http://localhost:5173`。

### 构建生产版本

```bash
cd todo-react
npm run build
```

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| TypeScript | 5 | 类型安全 |
| Vite | 8 | 构建工具 |
| localStorage | — | 数据持久化 |

## 设计

采用暖色纸质笔记本风格，字体搭配：

- **Playfair Display** — 标题
- **Noto Serif SC** — 正文
- **DM Mono** — 行号、标签、日期
