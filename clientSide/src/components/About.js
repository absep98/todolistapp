import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r to-indigo-600 text-white flex justify-center items-center">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg text-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-4">About AKS's ToDo App</h2>
        <p className="mb-4 text-lg">
          AKS's ToDo App helps you manage and track your daily tasks efficiently. You can create, update, and delete tasks easily.
        </p>
        <p className="mb-4 text-lg">
          The app is designed to help you stay organized, reduce stress, and boost productivity. It's simple, fast, and reliable.
        </p>
        <p className="mb-4 text-lg">
          Our mission is to provide an easy-to-use platform that helps people organize their daily life and increase efficiency.
        </p>
        <p className="text-center text-sm text-gray-600">
          © 2024 AKS's ToDo App. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
