import React, { useEffect, useState } from "react";
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

  const [sessionName, setSessionName] = useState(generateRandomSessionName());
  const [startTime, setStartTime] = useState(new Date());

  const db = getDatabase();
  const chatRef = ref(db, "chat");

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
  }, []);

  const getUserColor = (email) => {
    // Check if the user already has a color assigned
    if (userColors[email]) {
      return userColors[email];
    }

    // Generate a random color
    const color = getRandomColor();

    // Save the color in the state
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
    // Check if the user already has an animal name assigned
    if (userAnimals[email]) {
      return userAnimals[email];
    }

    // Generate a unique animal name
    const animal = generateUniqueAnimalName();

    // Save the animal name in the state
    userAnimals[email] = animal;

    return animal;
  };

  const generateUniqueAnimalName = () => {
    // Add more animal names as needed
    const animalNames = [
      "Tiger",
      "Elephant",
      "Lion",
      "Giraffe",
      "Penguin",
      "Panda",
    ];

    // Generate a random index
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

  const calculateTimeSpent = () => {
    const currentTime = new Date();
    const timeDiff = currentTime - startTime;
    const seconds = Math.floor(timeDiff / 1000);
    return seconds;
  };

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-black text-white p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-sky-500">{sessionName}</h2>
        </div>
        <div className="mb-4 text-sky-500 text-lg">
          <p className="text-lg font-inter">
            This is a secure channel. Messages can't be encrypted, so please
            don't misbehave.
          </p>
        </div>
        <div>
          <p className="text-sm font-inter">
            Current Date: {new Date().toDateString()}
          </p>
          <p className="text-sm font-inter">
            Time Spent: {calculateTimeSpent()} seconds
          </p>
        </div>
      </div>

      {/* Chatbox */}
      <div className="flex flex-col w-5/6 bg-black border border-sky-500 shadow-lg overflow-hidden animate__animated animate__fadeInUp">
        {/* Title Bar */}
        <div className="p-4 border-b border-gray-300 bg-gray-800 text-white">
          <h1 className="text-xl font-bold">{sessionName}</h1>
        </div>

        {/* Chat Window */}
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 flex items-start">
              <img
                src={`https://placekitten.com/40/40?image=${index}(
                  message.userEmail
                )}`} // Use Unsplash API for random animal images
                alt="User Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div
                className={`bg-blue-600 text-white py-4 px-6 rounded-lg inline-block`}
                style={{ backgroundColor: getUserColor(message.userEmail) }}
              >
                <span className="font-bold text-yellow-400">
                  {message.userName}:
                </span>{" "}
                {message.newMessage}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input and Send Button */}
        <form
          onSubmit={handleSendMessage}
          className="flex p-4 border-t-2 border-gray-300 bg-black"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
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
// Function to generate a random session name
const generateRandomSessionName = () => {
  const adjectives = ["Mystical", "Enchanted", "Whimsical", "Secretive"];
  const nouns = ["Jungle", "Harmony", "Oasis", "Serenity"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun} Chatroom`;
};

export default Chatbox;
