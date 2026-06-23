// import "./ChatWindow.css";
// import Chat from "./chat.jsx";
// import { MyContext } from "./MyContext.jsx";
// import { useContext ,useEffect} from "react";
// // import ScaleLoader from "react-spinners/ScaleLoader";
// function ChatWindow() {
//   const {
//     prompt,
//     setPrompt,
//     reply,
//     setReply,
//     currentThreadID,
//     newChat,
//     setnewChat,
//     prevChats,
//     setprevChats
//   } = useContext(MyContext);

//   const getReply = async () => {
//     if (!prompt.trim()) return;

//     try {
//       const response = await fetch("http://localhost:8080/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           threadID: currentThreadID,
//           message: prompt,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get response from server");
//       }

//       const data = await response.json();

//       console.log("Response:", data);

//       setReply(data.reply);
//       setPrompt("");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
// useEffect(() => {
//   if ( prompt && reply) {
//     setprevChats(prevChats => [
// ...prevChats,{role:"user",content:prompt},{role:"assistant",content:reply}
//     ]);
//   }
//   setPrompt("");
// }, [reply]);

//   return (
//     <div className="chatWindow">
//       <div className="navbar">
//         <span>
//           AskGPT <i className="fa-solid fa-angle-down"></i>
//         </span>

//         <div className="userIconDiv">
//           <span>
//             <i className="fa-solid fa-user"></i>
//           </span>
//         </div>
//       </div>

//       <Chat />

//       <div className="chatInput">
//         <div className="inputBox">
//           <input
//             type="text"
//             placeholder="Ask Anything"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 getReply();
//               }
//             }}
//           />

//           <div id="submit" onClick={getReply}>
//             <i className="fa-solid fa-paper-plane"></i>
//           </div>
//         </div>

//         <p className="info">
//           AskGPT can make mistakes, please verify the information provided by it.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ChatWindow;


import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    setReply,
    currentThreadID,
    setnewChat,
    setprevChats,
  } = useContext(MyContext);

  const getReply = async () => {
    if (!prompt.trim()) return;

    try {
      const userMessage = prompt;

      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadID: currentThreadID,
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();

      console.log("Response:", data);

      setprevChats((prev) => [
        ...prev,
        {
          role: "user",
          content: userMessage,
        },
        {
          role: "assistant",
          content: data.reply,
        },
      ]);

      setReply(data.reply);
      setPrompt("");
      setnewChat(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          AskGPT <i className="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIconDiv">
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat />

      <div className="chatInput">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask Anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getReply();
              }
            }}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          AskGPT can make mistakes, please verify the information provided.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;