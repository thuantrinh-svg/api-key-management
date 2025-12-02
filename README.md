# API Key Management System

A modern, full-featured API Key Management system with **Google authentication**, **AI-powered GitHub analysis**, and **secure key management**. Built with Next.js 16, Supabase, and TypeScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Auth](https://img.shields.io/badge/Auth-Google%20SSO-blue)
![AI](https://img.shields.io/badge/AI-LangChain-green)

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Google
- 🤖 **GitHub Summarizer** - AI-powered repository analysis using LangChain
- 🔒 **Secure API Routes** - Protected endpoints with session validation
- 🎨 **Modern UI** - Beautiful gradient design with dark mode
- 📊 **Complete Dashboard** - 6 full-featured pages
- 🔑 **Full CRUD Operations** - Create, read, update, delete API keys
- 🎯 **Interactive Playground** - Test API endpoints with code generation
- 👤 **Multi-user Support** - User isolation with RLS policies
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Google OAuth (see Google SSO Setup guide)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=generate_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# OpenAI (for GitHub Summarizer)
OPENAI_API_KEY=your_openai_api_key

# GitHub (optional)
GITHUB_TOKEN=your_github_token
```

### 3. Setup Database

1. Run `database/supabase-schema.sql` - Create API keys table
2. Run `database/users-schema.sql` - Create users table for auth

In Supabase SQL Editor:
- Copy and paste each SQL file
- Click **Run**

### 4. Configure Google OAuth

Follow the [Google SSO Setup Guide](docs/GOOGLE_SSO_SETUP.md):
- Create Google OAuth credentials
- Configure redirect URIs
- Add credentials to `.env.local`

### 5. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
api-key-management/
├── app/
│   ├── api/                        # API routes
│   │   ├── auth/                   # NextAuth authentication
│   │   ├── api-keys/               # API key CRUD operations
│   │   └── github-summarizer/      # GitHub analysis AI
│   ├── auth/                       # Auth pages (signin, error)
│   ├── components/                 # Reusable components
│   ├── lib/                        # Utilities & clients
│   ├── hooks/                      # Custom React hooks
│   ├── [pages]/                    # Application pages
│   └── layout.tsx                  # Root layout
├── database/                       # SQL schemas & migrations
├── docs/                           # Comprehensive documentation
└── README.md
```

## 📚 Documentation

### Getting Started
- **[Google SSO Setup](docs/GOOGLE_SSO_SETUP.md)** - Complete OAuth configuration
- **[GitHub Summarizer](docs/GITHUB_SUMMARIZER.md)** - AI repository analysis setup

### Setup & Deployment
- **[Quick Start](docs/QUICKSTART.md)** - 5-minute setup
- **[Detailed Setup](docs/SETUP.md)** - Complete configuration guide

### Help & Support
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** NextAuth.js + Google OAuth
- **AI:** LangChain + OpenAI GPT-4
- **Styling:** Tailwind CSS + Dark Mode
- **Language:** TypeScript
- **UI:** Lucide icons + Custom components
- **Notifications:** Sonner
- **State Management:** React Hooks + Custom Hooks

## 📊 Available Pages

| Page | Path | Features |
|------|------|----------|
| Overview | `/` | API key management dashboard |
| Research Assistant | `/research-assistant` | Coming soon |
| Research Reports | `/research-reports` | Report browsing & filtering |
| API Playground | `/api-playground` | Test GitHub Summarizer & custom APIs |
| Invoices | `/invoices` | Billing history & payment info |
| Documentation | `/documentation` | API reference & guides |

## 🔐 Security Features

- ✅ **Google OAuth** for secure authentication
- ✅ **Session validation** on all protected routes
- ✅ **API routes** protect database credentials
- ✅ **Input validation** on all endpoints
- ✅ **RLS policies** for user data isolation
- ✅ **Secure key generation** with random tokens
- ✅ **Environment variables** for sensitive config
- ✅ **User-scoped data** - Users only see their own keys

## 🔄 Authentication Flow

```
Google Sign In
    ↓
Google OAuth Verification
    ↓
NextAuth Session Created
    ↓
User Stored in Supabase
    ↓
Authenticated Dashboard Access
    ↓
Create & Manage API Keys
    ↓
Use Keys with Services
```

## 🤖 GitHub Summarizer

Analyze any GitHub repository in seconds:

1. Enter a GitHub URL
2. AI fetches and analyzes README
3. Get summary + interesting facts
4. View repository metadata (stars, license, etc.)

**API Endpoint:** `POST /api/github-summarizer`

See [GitHub Summarizer Setup](docs/GITHUB_SUMMARIZER.md) for details.

## 🎯 API Key Management

### Create Key
- Automatically generates secure random key
- Stores with user ID
- Returns immediately for use

### Manage Keys
- View all your keys
- Edit key names
- Copy keys to clipboard
- Delete when no longer needed

### Track Usage
- See usage count per key
- Monitor API requests
- Plan resource allocation

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms

1. Set environment variables
2. Update `NEXTAUTH_URL` to production domain
3. Update Google OAuth redirect URIs
4. Deploy via your platform

See [Google SSO Setup](docs/GOOGLE_SSO_SETUP.md) for production configuration.

## 📈 Features Roadmap

- [ ] Usage analytics dashboard
- [ ] API key expiration dates
- [ ] Key scopes & permissions
- [ ] Webhook notifications
- [ ] Rate limiting per key
- [ ] Key rotation automation
- [ ] Audit logs
- [ ] Team collaboration

## 🐛 Troubleshooting

**Issue:** "Invalid Client ID or Secret"
- Check Google credentials are copied exactly
- Verify `.env.local` format
- No trailing spaces

**Issue:** "Redirect URI mismatch"
- Ensure URLs match in Google Cloud Console
- Check for typos in domain names
- Case-sensitive!

**Issue:** User not appearing in database
- Verify `users-schema.sql` was run
- Check RLS policies are enabled
- Check application logs

See [Full Troubleshooting Guide](docs/TROUBLESHOOTING.md) for more.

## 📞 Support

- Check the [documentation](docs/)
- Review [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- Check [Google SSO Guide](docs/GOOGLE_SSO_SETUP.md)

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 🙏 Acknowledgments

- Inspired by [Tavily AI](https://tavily.com)
- Built with [Cursor IDE](https://cursor.sh)
- Reference: [dandi](https://github.com/emarco177/dandi)

---

**Ready to get started?** Follow the [Quick Start Guide](docs/QUICKSTART.md) to be up and running in 5 minutes!

**Need help with OAuth?** Check the [Google SSO Setup Guide](docs/GOOGLE_SSO_SETUP.md).

**Want to use GitHub Summarizer?** See the [GitHub Summarizer Setup](docs/GITHUB_SUMMARIZER.md).
