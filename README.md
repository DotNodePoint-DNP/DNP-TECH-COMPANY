# 🚀 DotNode Point

**DotNode Point** is a modern IT company website and business management platform built to showcase digital services, software products, career opportunities, and company information while providing a secure administrative dashboard for managing business operations.

The project combines a professional public-facing website with a full-featured admin management system.

---

## 🌐 About the Project

DotNode Point is designed for an IT company providing modern technology and software development services.

Visitors can explore the company's services and products, browse career opportunities, submit applications, send inquiries, request meetings, and contact the company.

Administrators can manage these activities through a secure admin dashboard.

---

## ✨ Features

### 🌍 Public Website

- Modern responsive homepage
- Products showcase
- IT services page
- About company page
- Careers and vacancy listings
- Online job applications
- Contact and inquiry system
- Meeting requests
- Partnership and collaboration inquiries
- Responsive navigation and footer
- Modern UI/UX

### 🔐 Admin Authentication

- Secure admin registration
- Admin login
- JWT-based authentication
- HTTP-only authentication cookies
- Admin logout
- Protected admin routes
- Admin status management
- Role-based admin structure

### 📊 Admin Dashboard

The administration dashboard provides centralized management for:

- 👥 Admins
- 📦 Products
- 💼 Careers
- 📄 Job Applications
- 💬 Customer Queries
- 📅 Meetings
- 🤝 Partnership Requests

The dashboard also displays statistics and recent activities for easier management.

---

## 📦 Product Management

Administrators can:

- Add products
- Edit product information
- Delete products
- Manage product status
- Add product technologies
- Add product URLs
- View existing products

---

## 💼 Career Management

The career management system allows administrators to:

- Create vacancies
- Edit vacancies
- Delete vacancies
- Activate or deactivate job openings
- Set departments
- Set employment types
- Add salary information
- Add requirements
- Set application deadlines

Visitors can browse active vacancies and submit applications.

---

## 📄 Application Management

Administrators can manage submitted job applications and update their status.

Supported application workflows include:

- Pending
- Reviewed
- Shortlisted
- Rejected

---

## 💬 Query Management

Customer inquiries can be managed directly from the admin dashboard.

Query statuses include:

- New
- Read
- Replied

The system also provides search and pagination for easier query management.

---

## 📅 Meeting Management

Visitors can submit meeting requests to the company.

Administrators can:

- View meeting requests
- Search meetings
- Update meeting status
- Delete meeting requests
- View recent meetings from the dashboard

---

## 🤝 Partnership Management

Businesses and individuals can submit partnership or collaboration inquiries.

Administrators can track requests using statuses such as:

- New
- Contacted
- In Progress
- Completed
- Rejected

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Node.js
- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- HTTP-only Cookies

### Development Tools

- Git
- GitHub
- npm
- VS Code

---

## 📁 Project Structure

```text
DotNode-Point/
│
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   └── login/
│   │
│   ├── api/
│   │   ├── admin/
│   │   ├── products/
│   │   ├── careers/
│   │   ├── queries/
│   │   ├── meetings/
│   │   └── partnership/
│   │
│   ├── products/
│   ├── services/
│   ├── careers/
│   ├── about/
│   └── contact/
│
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── config/
│   ├── db/
│   └── models/
│
├── public/
│
├── .env.local
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/DotNodePoint-DNP/DNP-TECH-COMPANY.git
```

### 2. Navigate to the project

```bash
cd DNP-TECH-COMPANY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

> ⚠️ Never commit `.env.local` or expose database credentials and JWT secrets publicly.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔒 Security

The application uses JWT authentication and HTTP-only cookies to protect administrative functionality.

Sensitive configuration such as database connection strings and JWT secrets is stored using environment variables and excluded from Git.

---

## 🎯 Project Goals

The goal of DotNode Point is to create a scalable digital platform where an IT company can:

- Present its services professionally
- Showcase software products
- Recruit employees and interns
- Manage job applications
- Communicate with potential customers
- Schedule business meetings
- Manage partnerships
- Centralize administrative operations

---

## 🔮 Future Improvements

Planned improvements may include:

- Customer authentication
- Client dashboard
- Live chat
- Email notifications
- Advanced role-based permissions
- Meeting calendar integration
- Analytics dashboard
- SEO improvements
- Cloud deployment
- Automated application notifications
- Enhanced security and audit logs

---

## 👨‍💻 Developer

**Rupesh Rajbanshi**

Full-Stack / MERN & Next.js Developer

GitHub:  
`https://github.com/RUPESH-RAJBANSHI`

---

## 🏢 DotNode Point

**Building modern digital solutions for businesses.**

If you find this project useful, consider giving the repository a ⭐.
