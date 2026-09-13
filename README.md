# 🧁 HomeBakes — Full-Stack Bakery Management Platform

A complete, production-grade bakery business management system built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Combining customer-facing e-commerce, admin dashboard, POS billing, delivery management, inventory tracking, financial reporting, and marketing tools.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)

---

## 📋 Table of Contents

- [Problem](#-problem)
- [Solution](#-solution)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Database Design](#-database-design)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Supabase Setup](#-supabase-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Security](#-security)
- [Future Improvements](#-future-improvements)

---

## 🎯 Problem

Home bakery businesses typically manage orders via WhatsApp, phone calls, and manual registers. This leads to:
- Lost orders and miscommunication
- No inventory tracking
- No financial visibility
- No customer history
- Manual billing with no records
- Inability to manage delivery logistics

## 💡 Solution

HomeBakes provides a **complete digital business platform** that covers the entire bakery workflow — from product browsing and online ordering to POS billing, delivery management, and profit analytics — all in one application.

---

## ✨ Features

### Customer-Facing Store
- 🛍️ Product catalog with variants, images, and filtering
- 🛒 Shopping cart with customization support
- 📍 GPS-based delivery location detection
- 🚚 Distance-based delivery fee calculation
- 💳 Online checkout with multiple payment methods
- 📦 Real-time order tracking with timeline
- 🎂 Custom cake builder with image upload
- ⭐ Product reviews and ratings
- 💝 Favorites/wishlist
- 🔔 In-app notifications
- 🤖 AI-ready chatbot assistant
- 📱 Fully responsive (mobile-first)

### Admin Dashboard
- 📊 Real-time sales analytics with charts
- 📦 Product & category management with variants
- 📋 Inventory tracking with low-stock alerts
- 🧾 Complete POS billing system for walk-in customers
- 🚛 Delivery management with zone-based pricing
- 💰 Payment tracking and invoice generation
- 📄 PDF invoice download/print
- 💸 Expense management
- 📈 Profit/Loss reports
- 🎫 Coupon & campaign management
- 👥 Customer management with purchase history
- 🎂 Custom cake request approval workflow
- 🔐 Role-based access (Super Admin, Admin, Staff)
- ⚙️ Dynamic bakery settings

### POS Billing
- 🔍 Quick product search
- 👤 Walk-in customer support
- 💵 Multi-payment method (Cash, UPI, Card)
- 🧾 Automatic invoice generation
- 📊 Unified with online sales in reports
- 💰 Daily cash closing

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                 NEXT.JS 15 APP                       │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Customer    │  │    Admin     │  │ API Routes  │ │
│  │   Store       │  │  Dashboard   │  │  /api/*     │ │
│  │              │  │              │  │             │ │
│  │  Homepage    │  │  Dashboard   │  │  Products   │ │
│  │  Shop        │  │  Products    │  │  Orders     │ │
│  │  Cart        │  │  Orders      │  │  Billing    │ │
│  │  Checkout    │  │  Billing     │  │  Delivery   │ │
│  │  Orders      │  │  Customers   │  │  Reports    │ │
│  │  Account     │  │  Delivery    │  │  Settings   │ │
│  │  Custom Cake │  │  Reports     │  │  Auth       │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
└────────────────────────┬────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              │     SUPABASE        │
              │                     │
              │  PostgreSQL (60+)   │
              │  Auth (JWT)         │
              │  Storage (Images)   │
              │  RLS (Row Security) │
              └─────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth + RLS |
| **Storage** | Supabase Storage |
| **State** | Zustand 5 |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts 2 |
| **PDF** | @react-pdf/renderer |
| **Maps** | Leaflet.js (free) |
| **Distance** | Haversine Formula |
| **Icons** | Lucide React |
| **Tables** | TanStack Table |
| **Toasts** | Sonner |
| **Dates** | date-fns |

---

## 🗄️ Database Design

60+ tables organized into domains:

- **Foundation**: bakery_settings, profiles, audit_logs
- **Products**: products, product_variants, product_images, product_categories
- **Inventory**: inventory, inventory_transactions
- **Customers**: customers, customer_addresses
- **Orders**: orders, order_items, order_status_history
- **Custom Cakes**: custom_orders, custom_order_images
- **Payments**: payments, invoices, invoice_items
- **Billing**: pos_bills, pos_bill_items, daily_cash_closings
- **Delivery**: delivery_zones, delivery_orders, delivery_tracking
- **Finance**: expenses, refunds, returns
- **Marketing**: coupons, campaigns, announcements, reviews, favorites, notifications
- **Chat**: chat_sessions, chat_messages

All tables use proper foreign keys, indexes, RLS policies, and database functions for atomic operations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Supabase account ([supabase.com](https://supabase.com))

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd homebakes

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations (in Supabase SQL editor)
# Execute files in supabase/migrations/ in order (001 through 016)

# Seed demo data
# Execute supabase/seed/seed.sql

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the customer store.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## 🔐 Environment Variables

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payment Gateway (Optional - for future integration)
PAYMENT_SECRET_KEY=
PAYMENT_KEY_ID=

# Maps API (Optional - using Leaflet by default)
MAPS_API_KEY=

# AI/Chatbot (Optional - for future AI integration)
AI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ Never commit `.env.local`. Only `.env.example` is tracked.

---

## 📡 API Documentation

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | List products (filters, pagination) |
| POST | /api/products | Create product (admin) |
| GET | /api/products/[id] | Get product details |
| PUT | /api/products/[id] | Update product (admin) |
| DELETE | /api/products/[id] | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/orders | List orders |
| POST | /api/orders | Create order (validated) |
| GET | /api/orders/[id] | Get order details |
| PUT | /api/orders/[id]/status | Update status (admin) |

### Billing
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/billing | List POS bills |
| POST | /api/billing | Create POS bill |
| GET | /api/billing/[id] | Get bill details |

### Delivery
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/delivery/calculate | Calculate delivery fee |
| GET | /api/delivery/zones | List delivery zones |
| GET | /api/delivery/orders | List delivery orders |

### Reports
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/reports/sales | Sales report |
| GET | /api/reports/products | Product report |
| GET | /api/reports/customers | Customer report |
| GET | /api/reports/profit | Profit/Loss report |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard.

### Supabase Production
1. Create a production Supabase project
2. Run all migrations in order
3. Configure RLS policies
4. Set up Storage buckets
5. Update environment variables

---

## 🔒 Security

- ✅ Supabase Auth with JWT sessions
- ✅ Row Level Security (RLS) on all tables
- ✅ Server-side price recalculation
- ✅ Server-side stock validation
- ✅ Server-side delivery fee validation
- ✅ Role-based access control (Super Admin, Admin, Staff, Customer)
- ✅ Input validation with Zod on all API routes
- ✅ No secrets exposed to frontend
- ✅ File upload validation (type, size)
- ✅ Audit logging for sensitive actions
- ✅ Protected admin routes via middleware

---

## 🔮 Future Improvements

- [ ] Delivery partner mobile app
- [ ] WhatsApp order notifications
- [ ] AI-powered chatbot (GPT integration)
- [ ] Loyalty points / membership program
- [ ] Subscription cakes / recurring orders
- [ ] Multi-branch support
- [ ] Ingredient-level inventory (BOM/Recipe management)
- [ ] Route optimization for deliveries
- [ ] SMS notifications
- [ ] Advanced tax configuration
- [ ] Supplier management & purchase orders

---

## 📄 License

This project is built as a portfolio demonstration. All rights reserved.

---

Built with ❤️ by HomeBakes
