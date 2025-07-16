<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 1000px; margin: auto; padding: 20px;">

  <h1>Manara: AI-Powered Learning Assistant</h1>

  <p><strong>Manara</strong> is a next-generation web application engineered to enhance the academic experience for university students. It replaces scattered, disorganized study materials with a centralized, intelligent platform that provides access to practice questions, assistive materials, and AI-powered explanations for complex topics.</p>

  <hr/>

  <h2>Live Preview & Screenshots</h2>

  <p><strong>Deployed App:</strong> 
    <a href="https://exam-app-1uad.vercel.app/" target="_blank">manara-learning-assistant.vercel.app</a>
  </p>

  <h3>Screenshots</h3>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; text-align: center;">
    <img width="500" alt="Screenshot 1" src="https://github.com/user-attachments/assets/dd72ac5b-9b4b-402f-82f7-24b5bcbdae25" />
    <img width="500" alt="Screenshot 2" src="https://github.com/user-attachments/assets/6224a5ea-78bc-4732-bf25-03ecf7c6f9a3" />
    <img width="500" alt="Screenshot 3" src="https://github.com/user-attachments/assets/31f41aca-2636-4908-b816-126af4634176" />
    <img width="500" alt="screenshot 4" src="https://github.com/user-attachments/assets/96dfaf73-cd01-40fc-aed1-1cbbefbe06ce" />
  </div>

  <hr/>

  <h2>The Problem</h2>
  <ul>
    <li><strong>Disorganized Resources:</strong> Practice questions, notes, and other materials are scattered across various platforms.</li>
    <li><strong>Lack of Understanding:</strong> Students often struggle to understand the concepts behind answers.</li>
    <li><strong>Limited Collaboration:</strong> No central space to ask course-specific questions or collaborate with peers.</li>
  </ul>

  <p><strong>Manara</strong> addresses these issues with a centralized, AI-enhanced, and community-driven approach.</p>

  <hr/>

  <h2>Core Features</h2>

  <h3>1. Centralized Repository</h3>
  <ul>
    <li>Access a vast library of practice questions with detailed AI explanations.</li>
    <li>Filter content by course, department, or year.</li>
    <li>Dynamically generated thumbnails for easy browsing.</li>
  </ul>

  <h3>2. AI-Powered Explanations</h3>
  <ul>
    <li>Instant, step-by-step explanations for complex practice questions.</li>
    <li>Breaks down topics into understandable chunks.</li>
    <li>Built-in AI chatbot for tutoring support.</li>
  </ul>

  <h3>3. Interactive Community Feed</h3>
  <ul>
    <li>Create posts and share insights with others.</li>
    <li>Persistent like/unlike system for engagement.</li>
    <li>Threaded discussion format with replies.</li>
  </ul>

  <hr/>

  <h2>Tech Stack</h2>
  <table border="1" cellspacing="0" cellpadding="8">
    <tr><th>Layer</th><th>Technologies Used</th></tr>
    <tr><td><strong>Frontend</strong></td><td>React, Material-UI, axios, i18next</td></tr>
    <tr><td><strong>Backend</strong></td><td>Node.js, Express.js</td></tr>
    <tr><td><strong>Database</strong></td><td>MySQL</td></tr>
    <tr><td><strong>File Storage</strong></td><td>Cloudinary</td></tr>
    <tr><td><strong>Deployment</strong></td><td>Frontend: Vercel, Backend & DB: Clever Cloud</td></tr>
  </table>

  <hr/>

  <h2>Getting Started Locally</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js (v18+)</li>
    <li>MySQL Server</li>
    <li>Cloudinary Account</li>
  </ul>

  <h3>Installation</h3>

  <ol>
    <li>
      <strong>Clone the repository:</strong>
      <pre><code>git clone https://github.com/your-username/manara-learning-assistant.git
cd manara-learning-assistant</code></pre>
    </li>
    <li>
      <strong>Backend Setup:</strong>
      <pre><code>cd backend
npm install
cp .env.example .env 
# Add your local MySQL and Cloudinary credentials to the .env file
npm run dev</code></pre>
    </li>
    <li>
      <strong>Frontend Setup:</strong>
      <pre><code>cd frontend
npm install
# Ensure your .env has REACT_APP_API_BASE_URL=http://localhost:5000
npm start</code></pre>
    </li>
  </ol>

</body>
</html>
