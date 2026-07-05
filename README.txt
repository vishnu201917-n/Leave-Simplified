README – Leave Simplified (React + Node + MongoDB)

Last updated: 15 Nov 2025

✅ Project Overview

Leave Simplified is a full-stack Leave Management System with:
Frontend: React + Vite
Backend: Node.js (Express)
Database: MongoDB (Mongoose)

The system has two portals:
Employee Portal
Manager Portal

Both portals have separate dashboards, pages, and functionalities.

✅ CURRENT FEATURES COMPLETED
1️⃣ Authentication System
Working login for Employee & Manager.
Sessions handled through express-session.
Auto-fetch logged-in user using /api/auth/me.

Seeded users:
Manager – manager@company.com / 12345

Employee – employee@company.com / 12345

Employee 2 – employee2@company.com / 12345

2️⃣ Employee Portal (FULLY WORKING)
✔ Dashboard
Shows:
Pending Leave Requests count
Approved Leaves count
Remaining Leaves
Shows Upcoming Leaves
Clean sidebar + header with name & role

Modern card layout

✔ Apply Leave Page

Submit leave requests

File upload support (image/pdf)

Stores leave in MongoDB

✔ Leave History Page

Full history of employee leaves

Proper Indian date format (DD/MM/YYYY)

✔ Calendar Page

Fully interactive calendar

Highlights:

Approved leaves

Pending leaves

Rejected leaves

Today

Weekends (Sat/Sun)

Indian National Holidays (highlighted with tooltip)

Hover tooltip shows leave details

✔ Policies Page

Displays all company leave policies from backend

✔ Notifications Page

UI completed

Fetches notifications if available

✔ Profile Page

Shows employee info

3️⃣ Manager Portal (PARTIALLY DONE)
✔ Manager Dashboard

Shows:

Total Employees

Pending Requests

Approved Leaves

Tables for:

Pending leave approvals

Approved leaves

All employees

✔ UI Pages Ready

These pages visually work but backend logic missing:

Manage Requests

Manage Employees

Manager Policies

Manager Notifications

Manager Profile

4️⃣ Database

Seed script (seed.js) working

Users, Policies, Leaves inserted

Sample leaves added for Jane Employee

🟡 Features STILL Pending / To Be Implemented
Manager Portal — Backend Needed

Approve / Reject Leave

Employee Management (Add/Delete/Update)

Manager Notifications

Update Manager Profile

Dashboard should show real-time stats (currently basic)

Employee Portal – Enhancements

Edit Profile page

Improve notifications

Attendance & shift tracking (optional)

🔴 Known Issues / Current Bugs
1. Manager Dashboard

Some values return undefined if backend doesn’t send correct arrays.

Seed data must use same casing (“Approved”, “Pending”, “Rejected”).

2. Manager Actions Missing

Approve/Reject leave buttons not functional (backend missing).

3. Notifications System

Fetch works, but add/edit/delete notifications not implemented.

4. Profile Editing

Not built yet.