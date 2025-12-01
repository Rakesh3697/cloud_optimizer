# ☁️ Cloud Cost Comparator – Full-Stack Edition

A modern full-stack cloud pricing analyzer built using **React + Vite** on the frontend and **Spring Boot** on the backend.

This app helps users quickly compare pricing across **AWS, Azure, and Google Cloud**, making it perfect for developers, startups, and engineering teams who want to keep cloud bills under control.

---

## 🚀 Features

### 🔹 Frontend (React + Vite)
- Fully responsive UI (mobile + desktop)
- Custom handcrafted CSS (utility-class style, no Tailwind)
- Real-time cloud cost comparison
- Smooth animations and clean card-based layout

### 🔹 Backend (Spring Boot)
- REST APIs for cloud price comparison
- Provider-wise cost breakdown logic
- Fast, stateless architecture
- CORS enabled for React (Vercel / Netlify)

---

## 🧩 Tech Stack

| Layer      | Technology                                 |
|------------|---------------------------------------------|
| Frontend   | React (Vite), Custom CSS                    |
| Backend    | Spring Boot (Java 17+)                      |
| Database   | Not required                                |
| Deployment | Vercel / Netlify (frontend), Render / EC2   |

---

# 🛠️ Backend – Spring Boot

## 📁 Folder Structure
cloud-cost-comparator-backend/
├── src/
│ ├── main/
│ │ ├── java/com/cloudcost/
│ │ │ ├── controller/
│ │ │ ├── model/
│ │ │ ├── service/
│ │ │ └── CloudCostComparatorApplication.java
│ │ └── resources/
│ │ ├── application.properties
│ │ └── static/
├── pom.xml

yaml
Copy code

---

## ▶️ Run Backend Server

```bash
mvn spring-boot:run

```
API Base URL:
```
http://localhost:8080/api
```
🎨 Frontend – React + Vite
📁 Folder Structure
```
cloud-cost-comparator-frontend/
├── public/  
├── src/  
│   ├── components/  
│   ├── pages/  
│   ├── utils/  
│   ├── assets/  
│   ├── styles/  
│   │   └── custom.css  
│   ├── App.jsx  
│   └── main.jsx  
├── package.json  
└── vite.config.js  

```
⚙️ Install Frontend Dependencies
```
npm install
```
▶️ Run Frontend Server
```
npm run dev
```
Frontend URL:
```
http://localhost:5173/
```
📦 Build for Production
```
npm run build
```
### 💡 Future Enhancements  

🧮 Real-time pricing API integration (Infracost / AWS Pricing API)  
📈 Cost visualization charts  
🔐 Login system & saved configurations  
💾 Export as PDF / CSV  
🤖 AI-powered optimization suggestions  

### 👨‍💻 Author   
Rakesh T 
B.Tech AI & Data Science
Passionate about Full-Stack, Cloud, and GenAI-powered solutions

📫 Email: rakeshthangaraj89@gmail.com

🪪 License
This project is licensed under the MIT License 
