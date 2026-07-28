const ScrollingText = () => {
  const highlights = [
    "🏛️ Historic University Town • Est. 1527",
    "🎓 23,000+ Students • 100+ Countries",
    "🏰 Medieval Castle & Fairytale Old Town",
    "🇵🇰 Vibrant Pakistani Community",
    "🤝 Student Support & Mentorship Network",
    "🎉 Cultural Events • Eid • Cricket • National Day"
  ];

  return (
    <div className="bg-accent/20 border-y border-accent/30 py-4 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Duplicate the content for seamless loop */}
        {[...highlights, ...highlights].map((text, index) => (
          <span
            key={index}
            className="inline-flex items-center px-8 text-lg font-semibold text-accent-foreground"
          >
            {text}
            <span className="mx-4 text-accent">•</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ScrollingText;
