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


// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import { MyContext } from "./MyContext.jsx";
// import { useContext } from "react";

// function ChatWindow() {
//   const {
//     prompt,
//     setPrompt,
//     setReply,
//     currentThreadId,
//     setnewChat,
//     setprevChats,
//   } = useContext(MyContext);

//   const getReply = async () => {
//     if (!prompt.trim()) return;

//     try {
//       const userMessage = prompt;

//       const response = await fetch("https://askgpt-1.onrender.com/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           threadID: currentThreadId,
//           message: userMessage,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get response from server");
//       }

//       const data = await response.json();

//       console.log("Response:", data);

//       setprevChats((prev) => [
//         ...prev,
//         {
//           role: "user",
//           content: userMessage,
//         },
//         {
//           role: "assistant",
//           content: data.reply,
//         },
//       ]);

//       setReply(data.reply);
//       setPrompt("");
//       setnewChat(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

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
//           AskGPT can make mistakes, please verify the information provided.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ChatWindow;




import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            <Chat></Chat>

            <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    >
                           
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;