# SkillScan: AI-Powered Resume Analysis and Mock Interview Platform

## 🌟 Inspiration  
Navigating the competitive job market can be daunting for students and professionals alike. SkillScan was created to address two key pain points: building an effective resume and preparing for interviews. Whether you're struggling to craft a resume that highlights your strengths or seeking to enhance your interview skills, SkillScan provides AI-driven solutions to help you stand out.

By combining cutting-edge AI technologies, SkillScan ensures that users receive personalized, actionable feedback on their resumes and interview performance, empowering them to achieve their career goals.

---

## 🌍 What It Does  
SkillScan is a platform that leverages artificial intelligence to provide two core features:

1. **Resume Analysis:**  
   - Upload your resume in PDF format, and our AI analyzes it for clarity, structure, grammar, and relevance to your target role.  
   - Provides detailed feedback and suggestions for improvement.  

2. **Mock Interviews:**  
   - Conduct real-time mock interviews directly on the platform.  
   - AI generates industry-relevant questions, evaluates your video responses, and provides constructive feedback on content, delivery, and confidence.  
   - Suggests follow-up questions to simulate a realistic interview experience.

---

## 🛠️ How We Built It  
SkillScan integrates a variety of technologies to create a seamless user experience:  

- **Frontend:** Built with React for a responsive and intuitive interface.  
- **Backend:** Powered by Node.js and Express.js for robust API handling.  
- **Resume Analysis:** Utilizes OpenAI's GPT-4 model to analyze and critique resumes.  
- **Mock Interviews:**  
   - Video is recorded directly in the browser using the React Webcam library.  
   - Google Cloud Speech-to-Text transcribes the recorded responses.  
   - OpenAI GPT-4 interprets the transcriptions to provide feedback and generate new questions.  
- **Cloud Storage:** Uploaded videos are stored on Google Cloud Storage for seamless processing.  

---

## 🔧 Challenges We Ran Into  
- **Video Recording:** Ensuring smooth browser-based video recording and integration with the backend.  
- **Real-Time Feedback:** Achieving low latency between response transcription and feedback delivery.  
- **API Integration:** Coordinating multiple APIs, including Google Speech-to-Text and OpenAI, to maintain performance and reliability.  
- **Error Handling:** Implementing robust error management for API rate limits and transient failures.  

---

## 🏆 Accomplishments We’re Proud Of  
- Successfully combined multiple APIs for resume analysis and mock interviews.  
- Created a platform that delivers real-time feedback for interviews with minimal delays.  
- Designed an intuitive, user-friendly interface accessible to everyone.  

---

## 🎓 What We Learned  
- Leveraging AI for personalized feedback in career development tools.  
- Handling multimedia (video and audio) in a web application and processing it in real-time.  
- Coordinating multiple API integrations effectively for a cohesive user experience.  

---

## 🚀 What’s Next  
- **Mobile App Development:** Expand accessibility by creating a mobile-friendly version of SkillScan.  
- **Custom Interview Models:** Train a domain-specific model for niche industry interviews.  
- **Language Support:** Add multilingual support to reach a global audience.  
- **Resume Templates:** Provide downloadable resume templates tailored to different industries.  

---

## ⚙️ How to Run the Project  

### **Backend**  
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SkillScan.git
   cd SkillScan

2. Install dependencies:
   ```bash
   npm install

3. Set up environment variables in a .env file:
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_APPLICATION_CREDENTIALS=path_to_your_google_cloud_key.json
   GCLOUD_BUCKET_NAME=your_google_cloud_bucket_name

4. Start the backend server:
   ```bash
   node server.js

### **Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Start development server:
   ```bash
   npm start

## 📜 License  
This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🙌 Acknowledgments  

We extend our gratitude to the following technologies and platforms that made this project possible:  

- **OpenAI:** For GPT-4-powered resume analysis and mock interview feedback.  
- **Google Cloud:** For Speech-to-Text API and Cloud Storage.  
- **React Webcam:** For enabling seamless video recording directly in the browser.  
- **Multer:** For efficiently handling file uploads in the backend.  

Thank you for using SkillScan! Together, we're shaping the future of career development. 🎯  
