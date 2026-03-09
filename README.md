# Students Table

A production-ready React single-page application for managing student records with full CRUD operations, localStorage persistence, and Excel export functionality.

## Features Checklist

- [x] Display Students Table with Name, Email, Age columns
- [x] Edit and Delete actions for each student
- [x] Add new student form with validation
- [x] Edit student form with pre-filled values
- [x] Delete confirmation modal
- [x] Simulated loading states (800ms delay)
- [x] Empty state message when no students
- [x] Toast notifications for CRUD operations
- [x] Excel export functionality (xlsx/SheetJS)
- [x] localStorage persistence
- [x] Input validation (required fields, email format, age range)
- [x] Responsive layout
- [x] Accessible UI (semantic HTML, keyboard navigation)

## Tech Stack

- React 18+ with TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- xlsx/SheetJS (Excel export)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Your Vercel account
   - Link to existing project? No
   - Project name: students-table
   - Directory? ./
   - Want to modify settings? No

Or connect your GitHub repository to Vercel for automatic deployments.

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod --dir=dist`
3. Follow the authentication prompt

Or connect your GitHub repository to Netlify for automatic deployments.

### Manual Deployment

Build the project and upload the `dist` folder to any static hosting service (AWS S3, GitHub Pages, etc.).

## Project Structure

```
src/
├── components/
│   ├── ConfirmDialog.tsx    # Delete confirmation modal
│   ├── LoadingSpinner.tsx   # Loading states
│   ├── StudentForm.tsx      # Add/Edit form with validation
│   ├── StudentTable.tsx     # Students data table
│   ├── StudentsPage.tsx     # Main page component
│   └── Toast.tsx            # Toast notifications
├── data/
│   └── seedData.ts          # Initial seed data
├── hooks/
│   └── useStudents.ts       # CRUD logic and localStorage
├── types/
│   └── student.ts           # TypeScript interfaces
├── utils/
│   └── exportExcel.ts       # Excel export utility
├── App.tsx
├── main.tsx
└── index.css
```

## Data Model

```json
{
  "id": "string (unique)",
  "name": "string",
  "email": "string",
  "age": "number (1-120)"
}
```

## License

MIT
