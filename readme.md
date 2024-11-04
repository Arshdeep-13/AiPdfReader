# FullStack Internship Assignment By Arshdeep Rooprai

## Technologies Used

- **Backend:** FastAPI
- **NLP Processing:** LLamaIndex, Gemini
- **Frontend:** React.js
- **File Storage:** Local filesystem

---

## Architecture

1. **Frontend (React):** Provides a user interface to upload PDFs and ask questions.
2. **Backend (FastAPI):** Manages file uploads, question processing, and integrates NLP.
3. **NLP Processing (LangChain/LLamaIndex):** Extracts relevant information from documents and responds to questions.
4. **Storage:** PDFs are stored locally on the server.

---

## Setup Instructions

### Prerequisites

- **Python** (v3.9 or higher)
- **Node.js** (v14 or higher)
- **Figma Design**: View the design prototype [here](https://www.figma.com/file/QHpASp7wGRRcjh0oxCuspL/FullStack-Engineer-Internship-Assignment?type=design&node-id=0-1&mode=design&t=geu9rfpXEecN8eFZ-0).

### Backend Setup (FastAPI)

1. Clone the repository:
   ```bash
   git clone https://github.com/Arshdeep-13/AiPdfReader.git
   cd AiPdfReader/backend
   ```
2. Set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   python3 -m uvicorn main:app --reload
   ```

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd AiPdfReader/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React application:
   ```bash
   npm run dev
   ```

## API Documentation

### Base URL

```bash
 http://localhost:8000
```

## Endpoints

### 1. Upload PDF Document

- **Endpoint**: `/upload`
- **Method**: `POST`
- **Description**: Uploads a PDF file to the server.

#### Request Body

- **file** (form-data): The PDF file to be uploaded.

#### Response

- **filename**: The uploaded file's name.
- **saved_to**: The storage path of the file.

---

### 2. Ask Question

- **Endpoint**: `/ask-question`
- **Method**: `POST`
- **Description**: Accepts a question and processes it against the uploaded PDF document's content.

#### Request Body

- **question** (string): The question to be answered based on the PDF content.

#### Response

- Returns the answer generated from the PDF content, or an error message if no documents are found.

---

## Usage

1. **Upload a PDF Document**: Use the "Upload PDF" option on the home page to upload a PDF document.
2. **Ask a Question**: After uploading, enter a question related to the document’s content. The backend processes the question and returns an answer.
3. **View Answers**: Answers are displayed on the same page, allowing follow-up or new questions on the same document.

---

## Future Enhancements

- **Support for Multiple Document Management**: Enable multiple PDFs to be uploaded and selected for question-answering.
- **Enhanced NLP Processing**: Integrate with advanced NLP models for improved accuracy and faster processing.
- **Cloud Storage Integration**: Optionally store uploaded files in AWS S3 for better scalability.

---

**Note**: Make sure the server is running on the specified Base URL before using the endpoints.
