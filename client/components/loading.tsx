const Loading = () => {
  return (
    <div className="fixed left-0 right-0 top-0 h-screen w-screen bg-white z-50">
      <figure className="loader">
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
    </div>
  );
};

export default Loading;
