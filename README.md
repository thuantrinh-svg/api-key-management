# API Key Management System

A modern, full-featured API Key Management system built with Next.js 16, Supabase, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- 🔐 **Secure API Routes** - All database operations through protected endpoints
- 🎨 **Modern UI** - Beautiful gradient design with dark mode support
- 📊 **Complete Dashboard** - 6 full-featured pages (Overview, Research Assistant, Reports, Playground, Invoices, Documentation)
- 🔑 **Full CRUD** - Create, read, update, delete API keys with toast notifications
- 🎯 **Interactive Playground** - Test API endpoints with live code generation
- 📱 **Responsive Design** - Works seamlessly on all devices

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Setup Database

Run the SQL from `database/supabase-schema.sql` in your Supabase SQL Editor.

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
api-key-management/
├── app/
│   ├── api/                    # Secure API routes
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities & Supabase client
│   ├── [pages]/                # Application pages
│   └── layout.tsx              # Root layout
├── database/                   # SQL schemas & migrations
├── docs/                       # Detailed documentation
└── README.md                   # This file
```

## Documentation

- **[Quick Start Guide](docs/QUICKSTART.md)** - Get started in 5 minutes
- **[Setup Guide](docs/SETUP.md)** - Detailed setup instructions
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **UI:** Custom components with Lucide icons
- **Notifications:** Sonner

## Available Pages

| Page | Path | Description |
|------|------|-------------|
| Overview | `/` | API key management dashboard |
| Research Assistant | `/research-assistant` | AI-powered research interface |
| Research Reports | `/research-reports` | Report management with filters |
| API Playground | `/api-playground` | Interactive API testing |
| Invoices | `/invoices` | Billing history |
| Documentation | `/documentation` | API documentation |

## Security

- API routes protect database credentials
- Input validation on all endpoints
- Supabase Row Level Security ready
- Secure API key generation
- Environment variable configuration

**Need help?** Check the [documentation](docs/) or open an issue.
