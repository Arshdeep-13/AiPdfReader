import { useContext, useState } from "react";
import right_arrow_img from "../assets/right_arrow.svg";
import bot_img from "../assets/bot_logo.svg";
import user_img from "../assets/user_logo.svg";
import Loader from "./Loader";
import { pdfContext } from "../context/PdfUploadedContext";

interface chatInterface {
  type: string;
  message: string;
}

const UserInput = () => {
  const [userQuery, setUserQuery] = useState("");
  const [chats, setChats] = useState<chatInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const { file } = useContext(pdfContext);

  const handleUserQuery = async () => {
    if (!userQuery) return;
    if (!file) {
      alert("Please upload a PDF file first");
      setUserQuery("");
      return;
    }

    setChats((prevChats) => [
      ...prevChats,
      {
        type: "user",
        message: userQuery,
      },
    ]);

    setUserQuery("");
    setLoading(true);

    let response = await fetch(
      `http://localhost:8000/ask-question?question=${userQuery}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();

    setChats((prevChats) => [
      ...prevChats,
      {
        type: "bot",
        message: data.response,
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="w-3/4 h-[90%]">
      {loading && <Loader />}
      <div className="w-full py-5 h-[80%]">
        <ul className="flex flex-col justify-start items-start gap-5 overflow-y-scroll h-full">
          {chats.map((chat, index) => (
            <li
              key={index}
              className={`flex gap-2 ${
                chat.type === "user"
                  ? "justify-end items-center"
                  : "justify-start items-center"
              }`}
            >
              <img
                src={chat.type === "user" ? user_img : bot_img}
                alt="user logo"
                className="w-10"
              />
              <span>{chat.message}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center rounded-md relative h-[20%]">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUserQuery();
            }
          }}
          placeholder="Send a message"
          className="px-6 py-3 bg-gray-200 placeholder-gray-600 rounded-md w-full"
        />
        <button className="absolute right-4" onClick={handleUserQuery}>
          <img src={right_arrow_img} alt="right_arrow_img" />
        </button>
      </div>
    </div>
  );
};

export default UserInput;
