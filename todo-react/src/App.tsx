import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { Filters } from './components/Filters';
import { AddInput } from './components/AddInput';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { useDarkMode } from './hooks/useDarkMode';
import './App.css';

export default function App() {
  const { todos, stats, filter, setFilter, addTodo, toggleTodo, editTodo, removingIds, startRemove, confirmRemove } = useTodos();
  const { dark, toggle } = useDarkMode();

  return (
    <div className="page">
      <div className="notebook">
        <Header dark={dark} onToggleTheme={toggle} />
        <Stats total={stats.total} pending={stats.pending} done={stats.done} />
        <Filters filter={filter} onChange={setFilter} />
        <AddInput onAdd={addTodo} />
        <hr className="section-rule" />
        <TodoList
          todos={todos}
          removingIds={removingIds}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onRemoveStart={startRemove}
          onRemoveEnd={confirmRemove}
        />
        <div className="footer">
          <span>使用 Enter 快速添加任务</span>
        </div>
      </div>
    </div>
  );
}
