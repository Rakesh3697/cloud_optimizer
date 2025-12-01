### Cloud Cost Comparator – Full-Stack Edition

A modern full-stack cloud pricing analyzer built using React + Vite on the frontend and Spring Boot on the backend.

This app helps users quickly compare pricing across AWS, Azure, and Google Cloud, making it perfect for developers, startups, and engineering teams who want to keep cloud bills under control.

### 🚀 Features

###🔹 Frontend (React + Vite)

Fully responsive UI (mobile + desktop)

Custom handcrafted CSS (utility-class style, no Tailwind dependency)

Real-time cloud cost comparison results

Smooth animations and clean card-based layout

###🔹 Backend (Spring Boot)

REST APIs for comparing cloud prices

Provider-wise cost breakdown logic

Fast, stateless architecture

CORS enabled for React deployments (Vercel / Netlify)

🛠️ Backend – Spring Boot

📁 Folder Structure

cloud-cost-comparator-backend/

├── src/

│   ├── main/

│   │   ├── java/com/cloudcost/

│   │   │   ├── controller/

│   │   │   ├── model/

│   │   │   ├── service/

│   │   │   └── CloudCostComparatorApplication.java

│   │   └── resources/

│   │       ├── application.properties

│   │       └── static/

├── pom.xml

▶️ Run Backend Server

mvn spring-boot:run



API Base URL:

http://localhost:8080/api

🎨 Frontend – React + Vite

📁 Folder Structure

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

⚙️ Install Dependencies

npm install



▶️ Run Frontend Server

npm run dev



Frontend URL:

http://localhost:5173/

📦 Build for Production

npm run build



💡 Future Enhancements

🧮 Real-time pricing API (Infracost / AWS Pricing API)
📈 Cost visualization charts
🔐 Login system (save configs)
💾 Export as PDF / CSV
🤖 AI-powered cloud optimization suggestions

👨‍💻 Author

Rakesh T (Rocky)

B.Tech AI & Data Science

Passionate about Full-Stack, Cloud, and GenAI-powered solutions
📫 Email: rakeshthangaraj89@gmail.com

🪪 License

This project is licensed under the MIT License — free to use, modify, and distribute.
