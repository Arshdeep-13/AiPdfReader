from fastapi import FastAPI, UploadFile, File
import shutil
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Document
from llama_index.llms.gemini import Gemini
from llama_index.core import Settings
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.core.node_parser import SentenceSplitter
import os

# Initialize FastAPI application
app = FastAPI()

# Define Google API Key (replace with your own)
Google_Api_Key = "AIzaSyBAIllYEcIMP9skSAPwVaQgUUBjFam8eHM"

# Define list of allowed origins for CORS policy
origins = [
    "http://localhost:5173",  # Adjust as per the frontend URL
]

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Allowed origins
    allow_credentials=True,       # Allow credentials (e.g., cookies)
    allow_methods=["*"],          # Allow all HTTP methods
    allow_headers=["*"],          # Allow all headers
)

# Directory to store uploaded files
UPLOAD_DIRECTORY = "uploaded_files/"
Path(UPLOAD_DIRECTORY).mkdir(parents=True, exist_ok=True)

# Endpoint for uploading files
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Saves an uploaded file to the UPLOAD_DIRECTORY.
    Args:
        file (UploadFile): The file to be uploaded.

    Returns:
        dict: Information about the saved file.
    """
    # Define the file path for saving
    file_path = f"{UPLOAD_DIRECTORY}{file.filename}"

    # Save the uploaded file to the file system
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return confirmation of file upload
    return {"filename": file.filename, "saved_to": file_path}

# Endpoint for processing a question based on the uploaded document
@app.post("/ask-question")
async def helper(question: str):
    """
    Processes a question using the first file in the upload directory.
    Args:
        question (str): The question to process.

    Returns:
        response: The generated response from the document data or an error if no documents are available.
    """
    # Retrieve list of files in upload directory
    files = os.listdir(UPLOAD_DIRECTORY)
    if not files:
        # Return error if no files are found
        return {"error": "No files available in the upload directory."}

    # Get the most recent file based on sorting
    first_file_path = os.path.join(UPLOAD_DIRECTORY, sorted(files, reverse=True)[0])

    # Load document data from the chosen file
    documents = SimpleDirectoryReader(input_files=[first_file_path]).load_data()

    # Set Google API key for environment use
    os.environ["GOOGLE_API_KEY"] = Google_Api_Key

    # Initialize Gemini LLM and embeddings for query processing
    llm = Gemini()
    gemini_embedding_model = GeminiEmbedding(model_name="models/embedding-001")
    
    # Configure settings for LLM and embeddings
    Settings._llm = llm
    Settings._embed_model = gemini_embedding_model
    Settings.node_parser = SentenceSplitter(chunk_size=512, chunk_overlap=20)  
    Settings.num_output = 2080  
    Settings.context_window = 3900 

    # Create an index from loaded documents for query processing
    index = VectorStoreIndex.from_documents(documents)
    
    # Create a query engine based on the index
    query_engine = index.as_query_engine() 

    # Process the question using the query engine and return response
    response = query_engine.query(question)
    return response
