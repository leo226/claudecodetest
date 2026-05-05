import { useState, useEffect, useCallback } from 'react';
import type { Todo, Filter, Priority } from '../types';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem('todos_v1');
    const todos: Todo[] = raw ? JSON.parse(raw) : [];
    return todos.map(t => ({ ...t, priority: t.priority ?? 'medium' }));
  } catch {
    return [];
  }
}

function loadNextId(): number {
  return parseInt(localStorage.getItem('nextId') || '1', 10);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [nextId, setNextId] = useState<number>(loadNextId);
  const [filter, setFilter] = useState<Filter>('all');
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    localStorage.setItem('todos_v1', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('nextId', String(nextId));
  }, [nextId]);

  const addTodo = useCallback((text: string, priority: Priority) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [...prev, { id: nextId, text: trimmed, done: false, priority, created: Date.now() }]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }, []);

  const startRemove = useCallback((id: number) => {
    setRemovingIds(prev => new Set(prev).add(id));
  }, []);

  const confirmRemove = useCallback((id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    setRemovingIds(prev => { const s = new Set(prev); s.delete(id); return s; });
  }, []);

  const editTodo = useCallback((id: number, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: trimmed } : t));
  }, []);

  const filteredTodos = todos.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const stats = {
    total: todos.length,
    pending: todos.filter(t => !t.done).length,
    done: todos.filter(t => t.done).length,
  };

  return { todos: filteredTodos, stats, filter, setFilter, addTodo, toggleTodo, editTodo, removingIds, startRemove, confirmRemove };
}
