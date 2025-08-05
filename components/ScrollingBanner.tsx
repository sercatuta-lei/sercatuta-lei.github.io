"use client";

export default function ScrollingBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden relative h-12 flex items-center">
      {/* First banner */}
      <div className="flex items-center space-x-8 animate-scroll whitespace-nowrap">
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🚀 Welcome to Jeff Lei Lab - Software Engineering Research at UT Arlington
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🔬 Cutting-edge research in AI/ML, Security, and IoT
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          📚 Latest publications in top-tier conferences and journals
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          👥 Join our dynamic team of researchers and students
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🌟 Advancing software engineering through innovation
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          💡 Explore our projects in smart contracts and IoT security
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🎓 Future opportunities for PhD and Master's students
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🔗 Connect with us for research collaborations
        </span>
      </div>
      
      {/* Duplicate banner for seamless loop */}
      <div className="flex items-center space-x-8 animate-scroll whitespace-nowrap absolute left-full">
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🚀 Welcome to Jeff Lei Lab - Software Engineering Research at UT Arlington
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🔬 Cutting-edge research in AI/ML, Security, and IoT
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          📚 Latest publications in top-tier conferences and journals
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          👥 Join our dynamic team of researchers and students
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🌟 Advancing software engineering through innovation
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          💡 Explore our projects in smart contracts and IoT security
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🎓 Future opportunities for PhD and Master's students
        </span>
        <span className="text-white font-bold text-sm uppercase tracking-wider">
          🔗 Connect with us for research collaborations
        </span>
      </div>
    </div>
  );
} 