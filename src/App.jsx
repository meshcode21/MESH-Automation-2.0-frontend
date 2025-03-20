import { useState } from 'react'
import axios from "axios";
import Navbar from "./components/Navbar";
import SideBar from './components/SideBar';
import PlayGround from './components/PlayGround';

// eslint-disable-next-line no-unused-vars
import { globalContext } from "./components/contextAPI";

function App() {

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [notSelectedData, setNotSelectedData] = useState([]);

  const [count, setCount] = useState({
    selected: 0,
    notSelected: 0
  })

  const [loading, setLoading] = useState(false)
  const [AutomationRunning, setAutomationRunning] = useState(false);

  async function handleFileChange(e) {
    const selectedFile = await e.target.files[0]; // Get the file

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post("/api/file/upload", formData);
      const filterData = response.data.data.map(item => ({ ...item, status: "..." }));
      setLoading(false);
      setData(filterData);
    }
    catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
    }
  }

  const [socketRef, setSocketRef] = useState();

  function handleAutomationClick() {
    if (!AutomationRunning) {
      setAutomationRunning(true);
      const socket = new WebSocket("/autoevent");
      setSocketRef(socket);

      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        console.log(eventData);


        setData((prev) => prev.map((item, index) => {
          return index === eventData.index ? { ...item, status: eventData.status } : item
        }));


        if (eventData.status === "not selected") {
          const d = data.find((item, index) => index == eventData.index);
          setNotSelectedData((prev) => [...prev, { ...d, status: "not selected" }]);
        }

        if (eventData.status === "selected") {
          const d = data.find((item, index) => index == eventData.index);
          setSelectedData((prev) => [...prev,{ ...d, status: "selected" }]);
        }
      };

    } else {
      setAutomationRunning(false);
      socketRef.close();
    }
  }

  return (
    <globalContext.Provider value={{ data, selectedData, notSelectedData, count, setCount, loading, setLoading, AutomationRunning, setAutomationRunning, handleFileChange, handleAutomationClick }}>

      <div data-theme="" className="h-screen w-screen relative bg-gray-100 dark:bg-gray-500">

        <Navbar classname={'h-16'} />

        <div className="w-full h-[calc(100%-4rem)] flex">
          <SideBar classname={'flex flex-col justify-between items-center'} />
          <PlayGround />
        </div>

      </div>
    </globalContext.Provider>
  );
}

export default App;