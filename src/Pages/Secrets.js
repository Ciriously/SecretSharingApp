import React, { useEffect, useState, useMemo } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  off,
} from "firebase/database";
import { useAuth0 } from "@auth0/auth0-react";
import { userColors, userAnimals } from "../utils/userdata";

const Chatbox = () => {
  const { user } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionName] = useState(generateRandomSessionName()); // Removed setSessionName
  const [startTime] = useState(new Date()); // Removed setStartTime
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const db = getDatabase();
  const chatRef = useMemo(() => ref(db, "chat"), [db]);
  useEffect(() => {
    const handleChildAdded = (snapshot) => {
      const messageData = snapshot.val();
      setMessages((messages) => [...messages, messageData]);
    };

    onChildAdded(chatRef, handleChildAdded);

    // Clean up the event listener when the component is unmounted
    return () => {
      off(chatRef, "child_added", handleChildAdded);
    };
  }, [chatRef]);

  const getUserColor = (email) => {
    if (userColors[email]) {
      return userColors[email];
    }

    const color = getRandomColor();
    userColors[email] = color;

    return color;
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#4FD1C5",
      "#F9A8D4",
      "#63B3ED",
      "#B794F4",
      "#FBD38D",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getUserAnimal = (email) => {
    if (userAnimals[email]) {
      return userAnimals[email];
    }

    const animal = generateUniqueAnimalName();
    userAnimals[email] = animal;

    return animal;
  };

  const generateUniqueAnimalName = () => {
    const animalNames = [
      "Tiger",
      "Elephant",
      "Lion",
      "Giraffe",
      "Penguin",
      "Panda",
    ];
    const randomIndex = Math.floor(Math.random() * animalNames.length);
    return animalNames[randomIndex];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      const chatMessageRef = push(chatRef);
      set(chatMessageRef, {
        newMessage,
        userEmail: user.email,
        userName: getUserAnimal(user.email),
      });
      setNewMessage("");
    }
  };

  const handleLeaveClick = () => {
    setShowLeaveConfirmation(true);
  };

  const handleLeaveConfirmation = (confirm) => {
    setShowLeaveConfirmation(false);
    if (confirm) {
      // Redirect to the home page or any other desired action
      window.location.href = "/";
    }
  };

  const calculateTimeSpent = () => {
    const currentTime = new Date();
    const timeDiff = currentTime - startTime;
    const seconds = Math.floor(timeDiff / 1000);
    return seconds;
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-cyan-950 text-white p-4 border-sky-500 relative">
        <button
          onClick={handleLeaveClick}
          className="mt-4 bg-red-600 text-white font-inter font-extrabold p-2 rounded-md cursor-pointer hover:bg-red-700 transition duration-300"
        >
          Leave
        </button>

        {/* Leave Confirmation Popup */}
        {showLeaveConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
            <div className="bg-black font-inter p-8 rounded-md shadow-md text-center">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to leave?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleLeaveConfirmation(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleLeaveConfirmation(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Session Information */}
        <div className="mt-8 md:block hidden">
          <h2 className="text-lg font-bold text-sky-500">
            Session Information
          </h2>
          <p className="text-sm font-inter">Session Name: {sessionName}</p>
          <p className="text-sm font-inter">
            Current Date: {new Date().toDateString()}
          </p>
          <p className="text-sm font-inter">
            Time Spent: {calculateTimeSpent()} seconds
          </p>
        </div>

        {/* Danger Bar */}
        <div className="mt-8 bg-red-600 text-white font-inter font-extrabold p-2 rounded-md hidden md:block">
          <p className="text-xl mb-5">
            🚫 Please don't share your personal information, credit cards, or
            any sensitive details. Keep it safe!
          </p>
        </div>
      </div>

      {/* Chatbox */}
      <div className="flex flex-col md:w-3/4 bg-black border border-sky-500 shadow-lg overflow-hidden animate__animated animate__fadeInUp">
        <div className="p-4 border-b border-gray-300 bg-gray-800 text-white">
          <h1 className="text-xl font-bold">{sessionName}</h1>
        </div>

        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 flex items-start">
              <img
                src={`https://placekitten.com/40/40?image=${index}`}
                alt="User Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div
                className={`bg-blue-600 text-white py-4 px-6 rounded-lg inline-block`}
                style={{ backgroundColor: getUserColor(message.userEmail) }}
              >
                <span className="font-bold text-yellow-200">
                  {message.userName}:
                </span>{" "}
                {message.newMessage}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex p-4 border-t-2 border-gray-300 bg-black"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Spill the Tea..."
            className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 bg-black text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const generateRandomSessionName = () => {
  const adjectives = ["Mystical", "Enchanted", "Whimsical", "Secretive"];
  const nouns = ["Jungle", "Harmony", "Oasis", "Serenity"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun} Chatroom`;
};

export default Chatbox;
