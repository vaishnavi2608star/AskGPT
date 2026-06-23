/* eslint-disable no-undef */
// // import "./sidebar.css";
// // import logo from "./assets/images.png";
// // import { useContext, useEffect } from "react";
// // import { MyContext } from "./MyContext.jsx";

// // function Sidebar() {
// //   const {
// //     allThreads,
// //     setAllThreads,
// //     currentThreadID,
// //   } = useContext(MyContext);

// //   const getAllThreads = async () => {
// //     try {
// //       const response = await fetch("http://localhost:8080/api/threads");

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch threads");
// //       }

// //       const res = await response.json();

// //       const filterData=res.map((thread) => ({threadID: thread.threadID, title: thread.title}));
// //       setAllThreads(filterData);
// //       console
// //     } catch (error) {
// //       console.error("Error fetching threads:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     getAllThreads();
// //   }, [currentThreadID]);

// //   return (
// //     <section className="sidebar">
// //       <button>
// //         <img src={logo} alt="gpt logo" className="logo" />
// //         <span>
// //           <i className="fa-solid fa-pen-to-square"></i>
// //         </span>
// //       </button>

// //       <ul className="history">
// //         {allThreads?.map((thread) => (
// //           <li key={thread.threadID}>
// //             {thread.title || thread.threadID}
// //           </li>
// //         ))}
// //       </ul>

// //       <div className="sign">
// //         <p>By Vaishnavi ♥</p>
// //       </div>
// //     </section>
// //   );
// // }

// // export default Sidebar;


// import "./sidebar.css";
// import logo from "./assets/images.png";
// import { useContext, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import { v1 as uuidv1 } from "uuid";

// function Sidebar() {
//   const {
//     allThreads,
//     setAllThreads,
//     currentThreadID,
//     setCurrentThreadID,
//     setprevChats,
//     setnewChat,
//   } = useContext(MyContext);

//   const getAllThreads = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/threads");

//       if (!response.ok) {
//         throw new Error("Failed to fetch threads");
//       }

//       const data = await response.json();

//       const filteredData = data.map((thread) => ({
//         threadID: thread.threadID,
//         title: thread.title,
//       }));

//       setAllThreads(filteredData);

//       console.log("Threads:", filteredData);
//     } catch (error) {
//       console.error("Error fetching threads:", error);
//     }
//   };

//   const loadThreadMessages = async (threadID) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/threads/${threadID}`
//       );

//       const messages = await response.json();

//       setCurrentThreadID(threadID);
//       setprevChats(messages);
//       setnewChat(false);
//     } catch (error) {
//       console.error("Error loading thread:", error);
//     }
//   };

//   const createNewChat = () => {
//     setCurrentThreadID(uuidv1());
//     setprevChats([]);
//     setnewChat(true);
//   };

//   useEffect(() => {
//     getAllThreads();
//   }, [currentThreadID]);

//   return (
//     <section className="sidebar">
//       {/* New Chat */}
//       <button onClick={createNewChat}>
//         <img src={logo} alt="gpt logo" className="logo" />
//         <span>
//           <i className="fa-solid fa-pen-to-square"></i>
//         </span>
//       </button>

//       {/* History */}
//       <ul className="history">
//         {allThreads?.map((thread, idx) => (
//                         <li key={idx} 
//                             onClick={(e) => changeThread(thread.threadId)}
//                             className={thread.threadId === currThreadId ? "highlighted": " "}
//                         >
//                             {thread.title}
//                             <i className="fa-solid fa-trash"
//                                 onClick={(e) => {
//                                     e.stopPropagation(); //stop event bubbling
//                                     deleteThread(thread.threadId);
//                                 }}
//                             ></i>
//                         </li>
//                     ))}
//       </ul>

//       {/* Footer */}
//       <div className="sign">
//         <p>By Vaishnavi ♥</p>
//       </div>
//     </section>
//   );
// }

// export default Sidebar;





// import "./Sidebar.css";
// import { useContext, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import {v1 as uuidv1} from "uuid";

// function Sidebar() {
//     const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

//     const getAllThreads = async () => {
//         try {
//             const response = await fetch("http://localhost:8080/api/threads");
//             const res = await response.json();
//             const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
//             //console.log(filteredData);
//             setAllThreads(filteredData);
//         } catch(err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getAllThreads();
//     }, [currThreadId])


//     const createNewChat = () => {
//         setNewChat(true);
//         setPrompt("");
//         setReply(null);
//         setCurrThreadId(uuidv1());
//         setPrevChats([]);
//     }

//     const changeThread = async (newThreadId) => {
//         setCurrThreadId(newThreadId);

//         try {
//             const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
//             const res = await response.json();
//             console.log(res);
//             setPrevChats(res);
//             setNewChat(false);
//             setReply(null);
//         } catch(err) {
//             console.log(err);
//         }
//     }   

//     const deleteThread = async (threadId) => {
//         try {
//             const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
//             const res = await response.json();
//             console.log(res);

//             //updated threads re-render
//             setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

//             if(threadId === currThreadId) {
//                 createNewChat();
//             }

//         } catch(err) {
//             console.log(err);
//         }
//     }

//     return (
//         <section className="sidebar">
//             <button onClick={createNewChat}>
//                 <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
//                 <span><i className="fa-solid fa-pen-to-square"></i></span>
//             </button>


//             <ul className="history">
//   {allThreads?.map((thread) => (
//     <li
//       key={thread.threadID}
//       onClick={() => changeThread(thread.threadID)}
//       className={
//         thread.threadID === currentThreadID ? "highlighted" : ""
//       }
//     >
//       <span className="chatTitle">{thread.title}</span>

//       <i
//         className="fa-solid fa-trash deleteIcon"
//         onClick={(e) => {
//           e.stopPropagation(); // prevents opening chat
//           deleteThread(thread.threadID);
//         }}
//       ></i>
//     </li>
//   ))}
// </ul>
 
//             <div className="sign">
//                 <p>By ApnaCollege &hearts;</p>
//             </div>
//         </section>
//     )
// }

// export default Sidebar;



import "./Sidebar.css";
import logo from "./assets/images.png";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,

    currentThreadId,
    setCurrentThreadId,

    setnewChat,
    setPrompt,
    setReply,
    setprevChats,
  } = useContext(MyContext);

  // Fetch all threads
  const getAllThreads = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/threads"
      );

      const data = await response.json();

      const filteredData = data.map((thread) => ({
        threadID: thread.threadID,
        title: thread.title,
      }));

      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currentThreadId]);

  // Create new chat
  const createNewChat = () => {
    setnewChat(true);
    setPrompt("");
    setReply(null);
    setCurrentThreadId(uuidv1());
    setprevChats([]);
  };

  // Open existing thread
  const changeThread = async (threadID) => {
    try {
      const response = await fetch(
        `https://askgpt-1.onrender.com/api/threads/${threadID}`
      );

      const messages = await response.json();

      setCurrentThreadId(threadID);
      setprevChats(messages);
      setnewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete thread
  const deleteThread = async (threadID) => {
    try {
      await fetch(
        `https://askgpt-1.onrender.com/api/threads${threadID}`,
        {
          method: "DELETE",
        }
      );

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadID !== threadID)
      );

      if (threadID === currentThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      {/* New Chat Button */}
      <button onClick={createNewChat}>
        <img src={logo} alt="GPT Logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* Chat History */}
      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadID}
            onClick={() => changeThread(thread.threadID)}
            className={
              thread.threadID === currentThreadId
                ? "highlighted"
                : ""
            }
          >
            <span className="chatTitle">
              {thread.title}
            </span>

            <i
              className="fa-solid fa-trash deleteIcon"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadID);
              }}
            ></i>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="sign">
        <p>By Vaishnavi ♥</p>
      </div>
    </section>
  );
}

export default Sidebar;