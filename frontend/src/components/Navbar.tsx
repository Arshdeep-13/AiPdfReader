import { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import plus_logo from "../assets/plus_logo.svg";
import { pdfContext } from "../context/PdfUploadedContext";

const Navbar = () => {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const { setFile } = useContext(pdfContext);

  const handleUplodeFile = async (e: any) => {
    // Check if file is selected
    if (e.length > 0) {
      const file = e[0];
      const formData = new FormData();
      formData.append("file", file);

      // Send file to backend
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      // Get response from backend
      const data = await response.json();
      setUploadedFileName(data.filename);
      setFile(true);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 shadow-md w-full h-[10%]">
      <div>
        <img src={logo} alt="company_logo" />
      </div>
      <div className="flex justify-center items-center gap-3">
        <span>{uploadedFileName}</span>
        <div className="relative flex justify-between items-center border-black border px-5 py-2 rounded-md hover:bg-gray-300">
          <input
            type="file"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => handleUplodeFile(e.target.files)}
          />
          <img className="w-6 md:mr-2" src={plus_logo} alt="plus_logo" />
          <span className="hidden md:block">Upload PDF</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
