/* eslint-disable react-hooks/set-state-in-effect */
// // import "./Chat.css";

// // function Chat(){
// //     return (
// //         <>
// //         </>
// //     )
// // }
// // export default Chat;

// import "./Chat.css";
// import React, { useContext ,useState,useEffect} from "react";
// import { MyContext } from "./MyContext.jsx";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css";

// function Chat() {
//   const { newChat, prevChats ,reply} = useContext(MyContext);
//   const [latestReply, setLatestReply] = useState(null);

//   // console.log("prevChats:", prevChats);
//   useEffect(() => {
//     if(!prevChats || prevChats.length === 0) return;
//     const content=reply.split(" ");
//     let idx=0;
//     const intervalId=setInterval(()=>{
//       setLatestReply(content.slice(0,idx+1)).join(" ");
//       idx++;
//       if(idx>=content.length){
//         clearInterval(intervalId);
//         return;
//       },40);
//       return () => clearInterval(intervalId);
//     }
//   },[prevChats,reply]);

//   return (
//     <>
//       {newChat && <h1>Start New Chat</h1>}

//       <div className="chats">
//         {prevChats?.slice(0, -1).map((chat, idx) => (
//           <div
//             key={idx}
//             className={chat.role === "user" ? "userDiv" : "gptDiv"}
//           >
//             {chat.role === "user" ? (
//               <p className="userMessage">{chat.content}</p>
//             ) : (
//               <div className="gptMessage">
//                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//                   {chat.content}
//                 </ReactMarkdown>
//               </div>
//             )}
//           </div>
//         ))}
//         {
//           prevChats?.length > 0 && latestReply!=null 
//           <div className="getDiv" key="typing">
//             <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//                   {latestReply}
//                 </ReactMarkdown>

//           </div>
//         }
//       </div>
//     </>
//   );
// }

// export default Chat;


// import "./Chat.css";
// import React, { useContext, useState, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/atom-one-dark.css";

// function Chat() {
//   const { newChat, prevChats, reply } = useContext(MyContext);

//   const [latestReply, setLatestReply] = useState("");

//   useEffect(() => {
//     if (!reply) return;

//     const words = reply.split(" ");
//     let index = 0;

//     setLatestReply("");

//     const intervalId = setInterval(() => {
//       setLatestReply(words.slice(0, index + 1).join(" "));
//       index++;

//       if (index >= words.length) {
//         clearInterval(intervalId);
//       }
//     }, 40);

//     return () => clearInterval(intervalId);
//   }, [reply]);

//   return (
//     <>
//       {newChat && <h1>Start New Chat</h1>}

//       <div className="chats">
//         {prevChats?.slice(0, -1).map((chat, idx) => (
//           <div
//             key={idx}
//             className={chat.role === "user" ? "userDiv" : "gptDiv"}
//           >
//             {chat.role === "user" ? (
//               <p className="userMessage">{chat.content}</p>
//             ) : (
//               <div className="gptMessage">
//                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//                   {chat.content}
//                 </ReactMarkdown>
//               </div>
//             )}
//           </div>
//         ))}

//         {latestReply && (
//           <div className="gptDiv">
//             <div className="gptMessage">
//               <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//                 {latestReply}
//               </ReactMarkdown>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Chat;





import "./Chat.css";
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);

  // eslint-disable-next-line no-unused-vars
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (!reply) {
      setLatestReply(null);
      return;
    }

    const words = reply.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, index + 1).join(" "));
      index++;

      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [reply]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}

      <div className="chats">
        {prevChats?.map((chat, idx) => (
          <div
            key={idx}
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <div className="gptMessage">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Chat;