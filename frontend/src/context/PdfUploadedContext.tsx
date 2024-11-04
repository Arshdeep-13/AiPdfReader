import { createContext, useState } from "react";

export const pdfContext = createContext({
  file: false,
  setFile: (file: boolean) => {},
});

const PdfUploadedContextProvider = ({ children }: any) => {
  const [file, setFile] = useState(false);

  return (
    <pdfContext.Provider value={{ file, setFile }}>
      {children}
    </pdfContext.Provider>
  );
};

export default PdfUploadedContextProvider;
