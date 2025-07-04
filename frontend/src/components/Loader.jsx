const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-blue-400 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Loader;
