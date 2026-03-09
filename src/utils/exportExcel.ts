import * as XLSX from 'xlsx';
import type { Student } from '../types/student';

export function exportToExcel(students: Student[], filename: string = 'students.xlsx') {
  const data = students.map(student => ({
    Name: student.name,
    Email: student.email,
    Age: student.age,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  const columnWidths = [
    { wch: 25 },
    { wch: 35 },
    { wch: 10 },
  ];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  XLSX.writeFile(workbook, filename);
}
