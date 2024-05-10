const SpinnerLoader = () => {
  return (
    <div className="backdrop-blur-sm backdrop-brightness-50 fixed top-0 left-0 flex justify-center items-center h-full w-full z-50">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  );
};

export default SpinnerLoader;
