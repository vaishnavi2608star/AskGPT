// import { useState } from "react";
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import { MyContext } from "./MyContext.jsx";
// import "./App.css";
// import { v1 as uuidv1 } from "uuid";
// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [reply, setReply] = useState("");
//   const [currentThreadId, setCurrentThreadId] = useState(uuidv1());
// const [prevChats,setprevChats] =useState([]);
// const [newChat,setnewChat] = useState(true);
// const [allThreads,setAllThreads] = useState([]);
//   const providerValues = {
//     prompt,
//     setPrompt,
//     reply,
//     setReply,
//     currentThreadId,
//     setCurrentThreadId,
//     newChat,
//     setnewChat,
//     prevChats,
//     setprevChats,
//     allThreads,
//     setAllThreads,
//   };

//   return (
//     <MyContext.Provider value={providerValues}>
//       <div className="app">
//         <Sidebar />
//         <ChatWindow />
//       </div>
//     </MyContext.Provider>
//   );
// }

// export default App;






import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import "./App.css";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);

  const [currentThreadId, setCurrentThreadId] = useState(uuidv1());

  const [prevChats, setprevChats] = useState([]);
  const [newChat, setnewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,

    reply,
    setReply,

    currentThreadId,
    setCurrentThreadId,

    prevChats,
    setprevChats,

    newChat,
    setnewChat,

    allThreads,
    setAllThreads,
  };

  return (
    <MyContext.Provider value={providerValues}>
      <div className="app">
        <Sidebar />
        <ChatWindow />
      </div>
    </MyContext.Provider>
  );
}

export default App;