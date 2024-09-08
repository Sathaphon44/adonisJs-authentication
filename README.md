
# AdonisJS API Authentication Project

This project is a simple API built using [AdonisJS](https://adonisjs.com/), focused on implementing user authentication and role-based authorization. The API demonstrates how to handle user login, permissions, and route protection using middleware and AdonisJS's built-in authentication system.

## Features:
- **User Authentication**: Secure login system using AdonisJS's built-in authentication with JWT or session-based strategies.
- **Role-based Authorization**: Protect API routes based on user roles (e.g., `user`, `admin`) using custom middleware.
- **Route Grouping**: Organize routes with a common prefix and apply middleware for easier route management.
- **Error Handling**: Provides feedback for unauthorized access or authentication failure.

## Tech Stack:
- **AdonisJS**: The main framework for building the API.
- **Node.js**: JavaScript runtime environment.
- **Lucid ORM**: Used for database interactions and managing relationships between users and permissions.
- **Middleware**: Used to implement role-based route protection.

## How to Use:
1. Clone this repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create database:
   ```bash
   docker compose up -d
   ```
4. Set up your `.env` file with your database and authentication settings.
5. Run database migrations:
   ```bash
   node ace migration:run
   ```
6. Start the AdonisJS server:
   ```bash
   npm run dev
   ```

## API Endpoints:
## กลุ่มเส้นทาง `/api/auth`:
- **`/api/auth/signIn`** (POST): เข้าสู่ระบบ
- **`/api/auth/signUp`** (POST): ลงทะเบียน

## กลุ่มเส้นทาง `/api/admin` (ต้องการมิดเดิลแวร์ `admin`):
- **`/api/admin/`** (GET): หน้าแดชบอร์ดสำหรับผู้ดูแลระบบ
- **`/api/admin/usersManagement`** (GET): การจัดการผู้ใช้สำหรับผู้ดูแลระบบ

## กลุ่มเส้นทาง `/api/dashboard` (ต้องการมิดเดิลแวร์ `user`):
- **`/api/dashboard/`** (GET): หน้าแดชบอร์ดทั่วไป


