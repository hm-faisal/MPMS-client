# MPMS Client - Minimal Project Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A modern, feature-rich project management system built with Next.js 16, React 19, and TypeScript. Designed for teams to efficiently manage projects, sprints, and tasks with an intuitive drag-and-drop interface.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Key Dependencies](#-key-dependencies)
- [UI Components](#-ui-components)
- [State Management](#-state-management)
- [Authentication](#-authentication)
- [API Integration](#-api-integration)
- [Styling Guide](#-styling-guide)
- [Performance Optimization](#-performance-optimization)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - Cookie-based session management
- 👥 **Role-Based Access Control** - Admin, Manager, and Member roles
- 📊 **Project Management** - Create, update, and track projects
- 🎯 **Sprint Planning** - Organize work into time-boxed sprints
- ✅ **Task Management** - Comprehensive task tracking with priorities
- 🎨 **Drag & Drop** - Intuitive kanban board with @dnd-kit
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🌓 **Dark Mode** - System-aware theme switching
- 🔍 **Advanced Filtering** - Filter tasks by status, priority, assignee
- 📈 **Real-time Updates** - Live data synchronization
- 🎭 **Smooth Animations** - Motion animations for better UX
- 📅 **Date Pickers** - User-friendly date selection with react-day-picker
- 🖼️ **Avatar System** - User profiles with Radix UI avatars

### User Experience
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 🎯 **Intuitive UI** - Clean, modern interface built with shadcn/ui
- 📋 **Data Tables** - Powerful tables with sorting and pagination
- 🔔 **Toast Notifications** - User feedback with Sonner
- 💾 **Form Validation** - Type-safe forms with React Hook Form + Zod
- 🎨 **Theming** - Customizable design system with CSS variables
- ♿ **Accessibility** - WCAG 2.1 compliant components

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16.0.8](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.1](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe development

### UI & Styling
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Forms & Validation
- **[React Hook Form 7.68.0](https://react-hook-form.com/)** - Performant form library
- **[Zod 4.1.13](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### Data & State
- **[Axios 1.13.2](https://axios-http.com/)** - HTTP client
- **[TanStack Table 8.21.3](https://tanstack.com/table)** - Headless table library
- **[date-fns 4.1.0](https://date-fns.org/)** - Modern date utility library

### Interactions
- **[@dnd-kit](https://dndkit.com/)** - Modern drag and drop toolkit
  - @dnd-kit/core - Core drag and drop functionality
  - @dnd-kit/sortable - Sortable lists and grids
  - @dnd-kit/utilities - Utility functions
- **[Motion 12.23.26](https://motion.dev/)** - Production-ready animations
- **[Swiper 12.0.3](https://swiperjs.com/)** - Mobile touch slider

### UI Feedback
- **[Sonner 2.0.7](https://sonner.emilkowal.ski/)** - Toast notifications
- **[React Day Picker 9.12.0](https://react-day-picker.js.org/)** - Date picker component

### Development Tools
- **[@biomejs/biome 2.2.0](https://biomejs.dev/)** - Fast formatter and linter
- **[tw-animate-css](https://github.com/ikcb/tw-animate-css)** - Tailwind animation utilities

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - v20.x or higher ([Download](https://nodejs.org/))
- **Bun** - v1.1.13 or higher ([Download](https://bun.sh/))
- **npm** - v10.x or higher (comes with Node.js)
- **Git** - For version control ([Download](https://git-scm.com/))

Optional but recommended:
- **VS Code** - With TypeScript and Tailwind CSS IntelliSense extensions
- **Backend API** - Running instance of MPMS backend server

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/mpms-client.git
cd mpms-client
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

```

### 4. Run Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
bun run build
bun run start
```

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_BASE_URL` | Backend API base URL with version | `http://localhost:8080/api/v1` |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL for Client components | `http://localhost:8080/api/v1` |

### Production Variables

```env
API_BASE_URL=https://mpms-cv4d.onrender.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://mpms-cv4d.onrender.com/api/v1
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server on port 3000 |
| `bun run build` | Build production bundle |
| `bun run start` | Start production server |
| `bun run lint` | Lint code with Biome |
| `bun run format` | Format code with Biome |

### Script Details

#### Development
```bash
bun run dev
# Starts Next.js development server with:
# - Hot module replacement
# - Fast refresh
# - TypeScript checking
# - Available at http://localhost:3000
```

#### Production Build
```bash
bun run build
# Creates optimized production build:
# - Minification
# - Tree shaking
# - Code splitting
# - Static page generation
```

#### Linting & Formatting
```bash
bun run lint        # Check code quality
bun run format      # Auto-format code
```

## 🔑 Key Dependencies

### UI Components Library

All UI components are built with **Radix UI** primitives and styled with **Tailwind CSS**:

- **Dialog** - Modal dialogs for forms and confirmations
- **Dropdown Menu** - Context menus and action menus
- **Alert Dialog** - Confirmation dialogs
- **Popover** - Floating content containers
- **Tooltip** - Helpful hints on hover
- **Avatar** - User profile pictures
- **Label** - Accessible form labels
- **Checkbox** - Form checkboxes
- **Separator** - Visual dividers
- **Slot** - Component composition utility
- **Hover Card** - Hover-triggered information cards

### Drag and Drop

```typescript
// Example: Kanban Board with @dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
```

### Form Validation

```typescript
// Example: Task Form with React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  dueDate: z.date(),
  assignees: z.array(z.string()).min(1),
});

const form = useForm({
  resolver: zodResolver(taskSchema),
});
```

### Data Tables

```typescript
// Example: TanStack Table
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
```

## 🎨 UI Components

### Component Library Structure

```
components/ui/
├── accordion.tsx
├── alert.tsx
├── alert-dialog.tsx
├── avatar.tsx
├── badge.tsx
├── button.tsx
├── card.tsx
├── checkbox.tsx
├── dialog.tsx
├── dropdown-menu.tsx
├── form.tsx
├── input.tsx
├── label.tsx
├── popover.tsx
├── select.tsx
├── separator.tsx
├── table.tsx
├── tabs.tsx
├── toast.tsx
├── tooltip.tsx
└── ...
```

### Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CreateTaskDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>Create New Task</DialogHeader>
        <form>
          <Label htmlFor="title">Task Title</Label>
          <Input id="title" placeholder="Enter task title" />
          <Button type="submit">Create Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## 🔄 State Management

### Local State
- **React Hooks** - useState, useEffect, useReducer
- **Custom Hooks** - Reusable stateful logic

### Server State
- **Axios** - HTTP requests with interceptors
- **React Hook Form** - Form state management

### Example: Custom Hook

```typescript
// lib/hooks/use-projects.ts
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get('/projects');
        setProjects(response.data.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return { projects, loading };
}
```

## 🔐 Authentication

### Authentication Flow

1. User submits login form
2. Credentials sent to `/api/v1/auth/login`
3. Server returns session cookie
4. Cookie automatically included in subsequent requests
5. Protected routes check authentication status

### Example: Protected Route

```typescript
// app/(dashboard)/layout.tsx
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return <div>{children}</div>;
}
```

### API Client Configuration

```typescript
// lib/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important: Send cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 🌐 API Integration

### API Service Layer

```typescript
// lib/api/projects.ts
import { api } from './axios';
import type { Project, CreateProjectDto } from '@/types';

export const projectsApi = {
  getAll: () => api.get<ApiResponse<Project[]>>('/projects'),

  getById: (id: string) =>
    api.get<ApiResponse<Project>>(`/projects/${id}`),

  create: (data: CreateProjectDto) =>
    api.post<ApiResponse<Project>>('/projects', data),

  update: (id: string, data: Partial<Project>) =>
    api.patch<ApiResponse<Project>>(`/projects/${id}`, data),

  delete: (id: string) =>
    api.delete(`/projects/${id}`),
};
```

### Usage in Components

```typescript
import { projectsApi } from '@/lib/api/projects';
import { toast } from 'sonner';

async function handleCreateProject(data: CreateProjectDto) {
  try {
    const response = await projectsApi.create(data);
    toast.success('Project created successfully!');
    return response.data.data;
  } catch (error) {
    toast.error('Failed to create project');
    throw error;
  }
}
```

## 🎨 Styling Guide

### Tailwind CSS

This project uses Tailwind CSS 4 with custom configuration:

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more colors
      },
    },
  },
};
```

### CSS Variables

```css
/* app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

### Component Styling

```tsx
import { cn } from '@/lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}
```

## ⚡ Performance Optimization

### Next.js Features

- **App Router** - Automatic code splitting
- **Server Components** - Reduced client-side JavaScript
- **Image Optimization** - Automatic image optimization with next/image
- **Font Optimization** - Automatic font optimization

### Best Practices

```typescript
// Use dynamic imports for large components
const KanbanBoard = dynamic(() => import('@/components/tasks/kanban-board'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Memoize expensive computations
const filteredTasks = useMemo(() => {
  return tasks.filter(task => task.status === filter);
}, [tasks, filter]);

// Debounce search inputs
const debouncedSearch = useDebouncedCallback((value) => {
  setSearchTerm(value);
}, 300);
```

## 🤝 Contributing

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
bun run kill-port 3000
# Or use different port
PORT=3001 bun run dev
```

#### Cookie Not Being Set
- Ensure `withCredentials: true` in axios config
- Check CORS settings on backend
- Verify `API_BASE_URL` is correct

#### Dark Mode Not Working
- Check if `next-themes` provider is in root layout
- Verify Tailwind `darkMode: 'class'` configuration

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
bun run build
```

#### Type Errors
```bash
# Regenerate TypeScript types
bun run tsc --noEmit
```

### Getting Help

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 💬 [GitHub Issues](https://github.com/your-org/mpms-client/issues)

---

## **Built with ❤️ by A-H-M-Faisal**

For more information about the backend API, see the [API Documentation](https://mpms-cv4d.onrender.com/api-docs)
