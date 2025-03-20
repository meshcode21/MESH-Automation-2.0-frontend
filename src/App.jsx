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

  const [count, setCount] = useState({ selected: 0, notSelected: 0 });
  const [automationTerminated, setAutomationTerminated] = useState(false)

  const [loading, setLoading] = useState(false)
  const [AutomationRunning, setAutomationRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

      socket.onopen = () => {
        console.log("Connected to websocket..");
        socket.send(JSON.stringify({ workingIndex: currentIndex }));
      }

      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        console.log(eventData);


        setData((prev) => prev.map((item, index) => {
          return index === eventData.index ? { ...item, status: eventData.status } : item
        }));


        if (eventData.status === "time out") {
          const d = data.find((item, index) => index == eventData.index);
          setNotSelectedData((prev) => [...prev, { ...d, status: "not selected" }]);
          setCount(prev => { return { ...prev, notSelected: prev.notSelected++ } });
        }

        if (eventData.status === "selected") {
          const d = data.find((item, index) => index == eventData.index);
          setSelectedData((prev) => [...prev, { ...d, status: "selected" }]);
        }

        if (eventData.message == "automation terminated") {
          setAutomationRunning(false);
          setAutomationTerminated(true);
        }

        setCurrentIndex(eventData.index);

      };

    } else {
      setAutomationRunning(false);
      setData((prev) => prev.map((item, index) => {
        return index === currentIndex ? { ...item, status: "..." } : item
      }));
      socketRef.close();
    }
  }

  function handleResetClick() {
    setData([]);
    setSelectedData([]);
    setNotSelectedData([]);
    setCount({ selected: 0, notSelected: 0 });
    setCurrentIndex(0);
  }

  return (
    <globalContext.Provider value={{ currentIndex, data, setData, selectedData, notSelectedData, count, setCount, loading, setLoading, AutomationRunning, setAutomationRunning, handleFileChange, handleAutomationClick, handleResetClick,automationTerminated, setAutomationTerminated }}>

      <div data-theme="" className="h-screen w-screen relative bg-gray-100 dark:bg-gray-500">

        <Navbar classname={'h-16'} />

        <div className="w-full h-[calc(100%-4rem)] flex">
          <SideBar classname={'flex flex-col justify-between items-center'} />
          <PlayGround />
        </div>

        <button
          className={`shadow-lg shadow-gray-400 absolute bottom-3 right-3 font-semibold text-xl rounded-full overflow-auto flex flex-nowrap items-center p-0 h-16 ${automationTerminated?'w-44':'w-16'} duration-300 ${!AutomationRunning && notSelectedData.length!=0?'cursor-pointer bg-green-300 text-gray-800 hover:w-44':' bg-green-300 text-gray-500'}`}
          disabled={AutomationRunning || notSelectedData.length==0}
          onClick={()=>alert()}
        >
          <div className='min-w-16 flex justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <p className='flex flex-col items-start'>
            <div className='text-[16px] leading-[16px]'>Result</div>
            <div className='leading-[25px]'>Download</div>
          </p>

        </button>

      </div>
    </globalContext.Provider>
  );
}

export default App;