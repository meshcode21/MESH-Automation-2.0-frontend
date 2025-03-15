import { useState } from 'react'
import axios from "axios";
import FileInput from "./components/FileInput";
import Navbar from "./components/Navbar";
import DataTable from './components/DataTable';

function App() {

  // const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e) => {
    const selectedFile = await e.target.files[0]; // Get the file
    // setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post("/api/file/upload", formData);
      setLoading(false);
      setData(response.data.data);
    }
    catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div data-theme="" className="h-screen w-screen relative bg-gray-200 dark:bg-gray-500">
      <Navbar />

      <div className="container m-auto h-[calc(100%-48px)] flex">
        {
          !data ?
            <FileInput onFileChange={handleFileChange} loadIcon={loading} />
            :
            <DataTable data={data} />
        }
      </div>
    </div>
  );
}

export default App;