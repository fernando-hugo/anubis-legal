<div align="center">

<img src="public/logo-anubis.jpeg" alt="Anubis Tech" width="180" />

# ⚖️ Anubis Legal OS

### Legal Practice Management System for Law Firms

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7.4-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)](https://neon.tech)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![LGPD](https://img.shields.io/badge/LGPD-Compliant-22c55e?style=flat-square)](https://www.gov.br/anpd)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

**Multi-tenant SaaS platform for complete law firm management.**

[🇧🇷 Português](./README.md) · [🇺🇸 English](#) · [🌐 Live Demo](#) · [📖 Docs](#installation)

</div>

---

## 📋 Table of Contents

- [About](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deploy to Vercel](#deploy-to-vercel)
- [Roadmap](#roadmap)
- [Security](#security--compliance)
- [License](#license)
- [Contact](#contact)

---

## 🏛️ About the Project

**Anubis Legal OS** is a SaaS legal practice management system developed by **Anubis Tech**, built to modernize and digitize the operations of law firms of any size.

### 🎯 Problem it solves

Law firms often rely on disorganized spreadsheets, emails, and legacy systems to manage hundreds of cases, critical deadlines, and clients. Anubis Legal OS centralizes everything in a modern, intuitive, and secure platform — accessible from any device.

### 💼 Business Model

| Item | Value |
|------|-------|
| Setup fee | R$ 8,000 |
| Monthly subscription per firm | R$ 1,200/month |
| AI Legal Module (coming soon) | + R$ 400/month |

> **Multi-tenant architecture**: a single system serves multiple law firms with completely isolated data.

---

## ✨ Features

### 🔐 Authentication & Multi-tenancy
- Access via unique firm slug — `/login?org=firm-name`
- Secure authentication with NextAuth v4 + JWT
- Role-based access: **Admin**, **Lawyer**, **Assistant**
- Full data isolation per organization
- Access blocking for overdue accounts with a single SQL command

### ⚖️ Case Management
- Full case registration with number, area, court division and courthouse
- Status: In Progress · Awaiting Decision · Appeal Phase · Closed
- Priorities: Urgent · High · Medium · Low
- Real-time search and filters

### ⏰ Deadline Tracking
- Urgency auto-calculated: **Today · Tomorrow · X days**
- Types: Standard, Fatal, Hearing, Diligence, Appeal
- Completion checkbox with strikethrough visual
- Urgent deadline alerts on the dashboard

### 👥 Client Management
- Support for Individuals (CPF) and Companies (CNPJ)
- Real-time search by name, email or tax document
- Linked case history per client

### 📄 Document Management
- Upload with **drag & drop**
- Types: Petition, Power of Attorney, Appeal, Contract, Court Decision
- Status: Draft · Under Review · Approved · Finalized

### 💰 Financial Module
- Time tracking with automatic value calculation (hours × R$/h)
- Invoice generation with sequential numbering (INV-001, INV-002...)
- Real-time financial dashboard with key metrics
- Billable / non-billable time tracking

### 📊 Analytics & Dashboard
- Case growth chart — Area and Bar modes
- Metrics: active cases, urgent deadlines, monthly revenue
- Recent activity feed

### 🔍 Global Search
- Unified search bar covering cases, clients, deadlines and documents
- **⌘K / Ctrl+K** shortcut from anywhere
- Keyboard navigation ↑↓ · Enter · Esc

### 📱 Responsive Design
- Fully adapted layout for **desktop, tablet and mobile**
- Animated hamburger drawer menu on mobile
- Fixed glassmorphism footer on all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js App Router | 16.1.6 |
| Language | TypeScript | 5.0 |
| ORM | Prisma | 7.4.2 |
| Database | PostgreSQL via Neon | — |
| Authentication | NextAuth.js | 4.24.11 |
| Styling | Tailwind CSS | 4.0 |
| Charts | Recharts | 3.8 |
| Icons | Lucide React | 0.577 |
| Deploy | Vercel | — |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                    CLIENT                         │
│          Next.js 16 · App Router · React          │
├──────────────────────────────────────────────────┤
│                AUTHENTICATION                     │
│         NextAuth v4 · JWT · Credentials           │
├──────────────────────────────────────────────────┤
│                  MIDDLEWARE                       │
│      Route protection · Session verification      │
├──────────────────────────────────────────────────┤
│                  API ROUTES                       │
│           Next.js · REST · Server Actions         │
├──────────────────────────────────────────────────┤
│                     ORM                           │
│            Prisma v7 · Neon Adapter               │
├──────────────────────────────────────────────────┤
│                  DATABASE                         │
│         PostgreSQL · Neon Serverless              │
└──────────────────────────────────────────────────┘
```

### Multi-tenant Isolation

```
/login?org=firm-alpha  →  Organization A (100% isolated data)
/login?org=firm-beta   →  Organization B (100% isolated data)
```

Every table has an `organizationId` field. All queries are filtered by this field, ensuring no firm can ever access another firm's data.

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9+
- Free account at [Neon](https://neon.tech) for the database

### Step by step

```bash
# 1. Clone the repository
git clone https://github.com/your-username/anubis-legal.git
cd anubis-legal

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Neon credentials and set AUTH_SECRET

# 4. Generate the Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate deploy

# 6. Seed the database with initial data
node run-seed.js

# 7. Start the development server
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

### Default demo credentials

```
URL:      http://localhost:3000/login?org=anubis-demo
Email:    admin@anubis.com
Password: admin123
```

> ⚠️ **Change the default credentials before going to production!**

---

## 🔧 Environment Variables

Create a `.env` file at the project root:

```env
# Database (Neon PostgreSQL — get yours at neon.tech)
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/dbname?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require&channel_binding=require"

# Authentication (generate a secure random key)
AUTH_SECRET="your-secret-key-at-least-32-characters-long"
```

> 🔒 The `.env` file is already in `.gitignore`. **Never commit it to Git.**

To generate a secure `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## 📁 Project Structure

```
anubis-legal/
├── prisma/
│   ├── schema.prisma          # Database models
│   ├── migrations/            # Migration history
│   └── seed.ts                # Initial seed data
├── public/
│   └── logo-anubis.jpeg       # Brand logo
├── src/
│   ├── app/
│   │   ├── api/auth/          # Auth API routes (NextAuth)
│   │   ├── dashboard/         # Main dashboard
│   │   ├── processos/         # Cases module
│   │   ├── prazos/            # Deadlines module
│   │   ├── clientes/          # Clients module
│   │   ├── documentos/        # Documents module
│   │   ├── financeiro/        # Financial module
│   │   ├── analytics/         # Analytics & reports
│   │   ├── login/             # Authentication page
│   │   ├── privacidade/       # Privacy policy (LGPD)
│   │   ├── termos/            # Terms of use
│   │   ├── layout.tsx         # Root layout
│   │   └── providers.tsx      # Global providers (SessionProvider)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx    # Side navigation + mobile menu
│   │   │   ├── Topbar.tsx     # Top bar + global search
│   │   │   └── Footer.tsx     # Fixed glassmorphism footer
│   │   └── dashboard/
│   │       ├── StatsCards.tsx
│   │       ├── ProcessesChart.tsx
│   │       ├── UrgentAlert.tsx
│   │       ├── Deadlines.tsx
│   │       └── ActivityFeed.tsx
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   └── prisma.ts          # Prisma singleton client
│   ├── types/
│   │   └── next-auth.d.ts     # Session type extensions
│   └── middleware.ts          # Authenticated route protection
├── prisma.config.ts           # Prisma v7 configuration
├── run-seed.js                # Seed script (plain Node.js)
├── .env.example               # Environment variables template
└── package.json
```

---

## 🌐 Deploy to Vercel

### Via GitHub (Recommended)

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**
3. Import your GitHub repository
4. Add the environment variables in the Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
5. Click **Deploy**

### Via CLI

```bash
# Install the Vercel CLI
npm i -g vercel

# Log in
vercel login

# Production deploy
vercel --prod
```

> ✅ Next.js is natively optimized for Vercel. No additional configuration required.

---

## 🗺️ Roadmap

### MVP ✅
- [x] Multi-tenant authentication with slug
- [x] Dashboard with metrics and charts
- [x] Cases module (CRUD + modals)
- [x] Deadline tracking with auto-urgency
- [x] Clients module (Individual/Company)
- [x] Documents module with drag & drop
- [x] Financial module (time tracking + invoices)
- [x] Global search with ⌘K shortcut
- [x] Full mobile responsiveness
- [x] LGPD footer + Privacy Policy + Terms of Use

### In Progress 🔄
- [ ] Real data persistence (CRUDs connected to database)
- [ ] Admin panel to manage firms
- [ ] Vercel deployment

### Coming Soon 🚀
- [ ] **AI Legal** — Automatic case summarization
- [ ] **AI Legal** — Legal document generator
- [ ] **AI Legal** — Case risk analysis
- [ ] **AI Legal** — PDF data extraction
- [ ] **AI Legal** — Internal legal chatbot
- [ ] Email notifications (urgent deadlines)
- [ ] PDF report generation
- [ ] Mobile app (React Native)

---

## 🔒 Security & Compliance

| Item | Status |
|------|--------|
| LGPD — Brazilian Data Protection Law | ✅ Compliant |
| SSL/TLS — Encryption in transit | ✅ Active |
| Bcrypt — Password hashing | ✅ Implemented |
| JWT — Secure sessions | ✅ Implemented |
| Multi-tenant — Data isolation | ✅ Implemented |
| RBAC — Role-based access control | ✅ Implemented |
| Privacy Policy | ✅ Published |
| Terms of Use | ✅ Published |

---

## 📄 License

This project is **proprietary and confidential**.

© 2026 **Anubis Tech** · CNPJ: 42.804.763/0001-35 · All rights reserved.

Reproduction, distribution, modification or use of this software without prior written authorization from Anubis Tech is strictly prohibited.

---

## 📞 Contact

<div align="center">

**Anubis Tech**

[![Email](https://img.shields.io/badge/Email-fernandohugoferreira@gmail.com-C9A84C?style=flat-square&logo=gmail)](mailto:fernandohugoferreira@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-(11)_96210--4871-C9A84C?style=flat-square&logo=whatsapp)](tel:+5511962104871)
[![Instagram](https://img.shields.io/badge/Instagram-@anubis.tec-C9A84C?style=flat-square&logo=instagram)](https://www.instagram.com/anubis.tec?igsh=MTZyajRydWdzZTdmNg==)

---

*Built with ❤️ by **Anubis Tech***  
*⚖️ Technology that transforms legal practice*

</div>