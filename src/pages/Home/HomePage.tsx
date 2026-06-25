import Footer from "../../components/Layout/Footer";

const Header = () => (
  <header className="text-center">
    <h1 className="text-5xl font-semibold mb-4 text-white cursor-default">
      Welcome to <span className="text-blue-500 font-bold">RaceMind</span> 
    </h1>
    <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
      Your ultimate companion for Assetto Corsa Competizione.
    </p>
  </header>
);

const HomePage = () => {
  return (
    <div className="relative min-h-full p-12 flex flex-col items-center justify-center overflow-hidden select-none bg-[#171d2a]">
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <Header />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
