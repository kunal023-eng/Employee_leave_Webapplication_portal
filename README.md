# 🏖️ Employee Leave Management Web Application

A full-stack **Employee Leave Management System** built with **React.js, Redux, ASP.NET Core Web API, and SQL Server**. It enables seamless leave requests, approvals, and role-based access tailored for **employees, managers, HR, and admins**.

---

## 🔗 GitHub Repository

[GitHub Repo](https://github.com/kunal023-eng/Employee_leave_Webapplication_portal/tree/main)

---

## 🚀 Features

### 👤 Employee
- Apply for Casual, Sick, or Earned leaves
- Track leave application status
- View leave history and balance

### 👨‍💼 Manager
- Approve or reject team leave requests
- View team leave calendar

### 🧑‍💼 HR/Admin
- Manage users and assign roles
- Define leave policies and yearly quotas
- Organization-wide leave reports

### 🔐 Role-Based Access Control
- Granular permissions per role (Employee, Manager, HR, Admin)

---

## 🛠️ Tech Stack

| Layer        | Tech Stack                      |
|--------------|----------------------------------|
| Frontend     | React.js, Redux, HTML5, CSS3     |
| Backend      | ASP.NET Core Web API (.NET 6+)   |
| Database     | SQL Server                       |
| API Comm     | Axios, REST                      |

---

## 📁 Project Structure

/EmployeeLeavePortal ├── /client # React.js Frontend │ ├── /components │ ├── /pages │ ├── /redux │ └── App.js ├── /server # ASP.NET Core API │ ├── /Controllers │ ├── /Models │ ├── /Services │ └── appsettings.json └── README.md

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1️⃣ Backend (.NET Core)

```bash
cd server
# Update `appsettings.json` with your SQL Server connection string
dotnet ef database update
dotnet run
# API will run at: https://localhost:5001
2️⃣ Frontend (React + Redux)
bash
Copy
Edit
cd client
npm install
npm start
# App will run at: http://localhost:3000


📄 License
This project is licensed under the MIT License.

👤 Author
Kunal Kumar Jena
