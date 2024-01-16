import React from "react";
import Footer from "../components/Footer";

const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="bg-black text-white p-8 rounded-md shadow-md mb-8 animate__animated animate__fadeIn">
      <div className="flex items-center justify-center mb-8">
        <img src={image} alt={title} className="w-medium h-medium mt-9" />
      </div>
      <h2 className="text-5xl font-bold mb-4 font-inter animate__animated animate__fadeIn">
        {title}
      </h2>
      <p className="text-xl font-inter animate__animated animate__fadeIn">
        {description}
      </p>
    </div>
  );
};
const FeaturesPage = () => {
  const features = [
    {
      title: "End-to-End Encryption",
      description:
        "Our secret chats app employs strong end-to-end encryption to ensure that your messages are private and secure.",
      image: "hacker.svg",
    },
    {
      title: "Real-Time Messaging",
      description:
        "Experience seamless real-time messaging, allowing you to have instant and engaging conversations with others.",
      image: "hands.png",
    },
    {
      title: "Customizable Settings",
      description:
        "Tailor the app to your preferences with customizable settings, giving you control over your secret chat experience.",
      image: "rocket.png",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Enjoy a user-friendly interface designed for simplicity and ease of use, making your secret chats hassle-free.",
      image: "robot.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-black">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
      <Footer />
    </div>
  );
};
export default FeaturesPage;
