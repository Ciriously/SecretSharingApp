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

  return (
    <div className="flex flex-col w-96 h-96 mx-auto mt-4 rounded-md bg-white border border-gray-300 shadow-lg overflow-hidden animate__animated animate__fadeInUp">
      {/* Chat Window */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg inline-block`}
              style={{ backgroundColor: getUserColor(message.userEmail) }}
            >
              <span className="font-bold">{message.userName}:</span>{" "}
              {message.newMessage}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input and Send Button */}
      <form
        onSubmit={handleSendMessage}
        className="flex p-4 border-t-2 border-gray-300"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
