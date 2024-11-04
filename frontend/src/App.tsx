import PdfUploadedContextProvider from "./context/PdfUploadedContext";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <PdfUploadedContextProvider>
        <LandingPage />
      </PdfUploadedContextProvider>
    </>
  );
}

export default App;
