import React from "react";

export default function HomePage({ user, onCategorySelect }) {
  const categories = [
    {
      name: "Science",
      icon: <BeakerIcon className="h-16 w-16 mx-auto mb-4 text-cyan-400" />,
    },
    {
      name: "History",
      icon: <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-green-400" />,
    },
    {
      name: "Technology",
      icon: <CpuChipIcon className="h-16 w-16 mx-auto mb-4 text-purple-400" />,
    },
  ];
  return (
    <div className="py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white">
          Welcome, {user.name}!
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Choose a category to start your challenge.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className="cursor-pointer bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-700 text-center transform transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:shadow-2xl"
          >
            {category.icon}
            <h3 className="text-2xl font-bold text-white">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
