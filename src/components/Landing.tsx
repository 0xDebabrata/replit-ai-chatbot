const Landing = () => {
  return (
    <div className="text-center bg-black flex flex-col items-center">
      <div className="container mx-auto">
        <h1 className="text-4xl text-medium mt-10 mb-3">chat w/ <span className="text-orange-500">replit</span> ai podcast</h1>
        <h3 className="text-neutral-300 mb-4">
          chat with leading experts in AI as they discuss the future of software development.
        </h3>
      </div>
      <iframe 
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        height="350" 
        style={{
          width: "100%",
          maxWidth: "660px",
          overflow: "hidden",
          borderRadius: "10px",
          margin: "10px auto",
        }}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="https://embed.podcasts.apple.com/us/podcast/replit-ai-podcast/id1689491150"
      />
      <p className="mt-16 text-neutral-400">
        built with <a href="https://searchcitrus.com" className="underline text-lime-300">citrus</a>, an open-source vector db
      </p>
      <p className="mb-16 text-neutral-400">
        <a href="https://github.com/0xdebabrata/citrus" target="_blank" rel="noopener" className="underline">github</a>
        <a href="https://docs.searchcitrus.com" target="_blank" rel="noopener" className="ml-5 underline">docs</a>
      </p>
    </div>
  );
};

export default Landing;
