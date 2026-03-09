import { useState } from 'react';
import type { Student, StudentFormData } from '../types/student';
import { useStudents } from '../hooks/useStudents';
import { StudentTable } from '../components/StudentTable';
import { StudentForm } from '../components/StudentForm';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ToastContainer } from '../components/Toast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { exportToExcel } from '../utils/exportExcel';

export function StudentsPage() {
  const { students, loading, toasts, removeToast, addStudent, updateStudent, deleteStudent } = useStudents();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Student | null>(null);

  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (student: Student) => {
    setDeleteConfirm(student);
  };

  const handleFormSubmit = async (data: StudentFormData) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
    } else {
      await addStudent(data);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirm) {
      await deleteStudent(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleExport = () => {
    exportToExcel(students, 'students.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Students Table</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={handleAddClick}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            Add Student
          </button>
          <button
            onClick={handleExport}
            disabled={students.length === 0 || loading}
            className="px-4 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Download Excel
          </button>
        </div>

        {loading && students.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <>
            {showForm && (
              <StudentForm
                student={editingStudent}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={loading}
              />
            )}
            <StudentTable
              students={students}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Student"
        message={`Are you sure you want to delete ${deleteConfirm?.name}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
}
