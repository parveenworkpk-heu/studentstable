import { useState, useEffect, useCallback } from 'react';
import type { Student, StudentFormData } from '../types/student';
import { seedStudents } from '../data/seedData';

const STORAGE_KEY = 'students_data';
const LOADING_DELAY = 800;

export type ToastType = 'success' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStudents(parsed);
      } catch {
        setStudents(seedStudents);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStudents));
      }
    } else {
      setStudents(seedStudents);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStudents));
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && students.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }
  }, [students, loading]);

  const addStudent = useCallback(async (data: StudentFormData) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
    
    const newStudent: Student = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      age: parseInt(data.age, 10),
    };
    
    setStudents(prev => [...prev, newStudent]);
    showToast('Student added successfully');
    setLoading(false);
  }, [showToast]);

  const updateStudent = useCallback(async (id: string, data: StudentFormData) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
    
    setStudents(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, name: data.name, email: data.email, age: parseInt(data.age, 10) }
          : s
      )
    );
    showToast('Student updated successfully');
    setLoading(false);
  }, [showToast]);

  const deleteStudent = useCallback(async (id: string) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
    
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast('Student deleted successfully');
    setLoading(false);
  }, [showToast]);

  return {
    students,
    loading,
    toasts,
    removeToast,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}
