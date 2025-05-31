import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold">Welcome to Green Day Records</h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover the best records, old and new!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Browse Collection
        </button>
      </div>
    </>
  );
};

export default Home;
