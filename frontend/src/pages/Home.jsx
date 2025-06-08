import Navbar from "../components/Navbar";
import logo from "../assets/GDRLogo.png";
import album1 from "../assets/Dark_Side_of_the_Moon.png";
import album2 from "../assets/spoon_album.jpg";
import album3 from "../assets/Oxnard.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen text-center bg-[var(--bg-color)] text-[var(--text-color)]">
        {/* CTA Container */}
        <div className="bg-[var(--secondary-bg-color)] p-8 rounded-lg shadow-lg max-w-xlg flex flex-col items-center">
          {/* Logo Image */}
          <img src={logo} alt="Green Day Records Logo" className="w-108 mb-4" />

          <h1 className="text-4xl font-bold">Welcome to Green Day Records</h1>
          <p className="text-lg mt-4">
            Discover the best records, old and new!
          </p>
        </div>
      </div>

      {/* Featured Records Section */}
      <section className="py-16 text-center bg-[var(--secondary-bg-color)]">
        <h2 className="text-3xl font-bold mb-6">Featured Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-[var(--bg-color)] p-6 rounded-lg shadow-md">
            <img src={album1} alt="Album 1" className="w-full rounded-md" />
            <h3 className="text-xl font-semibold mt-4">Classic Vinyl</h3>
            <p className="text-[var(--text-color)]">Timeless hits from legendary artists.</p>
          </div>
          <div className="bg-[var(--bg-color)] p-6 rounded-lg shadow-md">
            <img src={album2} alt="Album 2" className="w-full rounded-md" />
            <h3 className="text-xl font-semibold mt-4">Indie Favorites</h3>
            <p className="text-[var(--text-color)]">Discover underground gems and fresh sounds.</p>
          </div>
          <div className="bg-[var(--bg-color)] p-6 rounded-lg shadow-md">
            <img src={album3} alt="Album 3" className="w-full rounded-md" />
            <h3 className="text-xl font-semibold mt-4">Limited Editions</h3>
            <p className="text-[var(--text-color)]">Exclusive pressings you won’t find anywhere else.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 text-center bg-[var(--bg-color)]">
        <h2 className="text-3xl font-bold mb-6">Why Choose Green Day Records?</h2>
        <div className="max-w-4xl mx-auto text-lg text-[var(--text-color)]">
          <p className="mb-4">✔️ Handpicked vinyl collections curated by music lovers.</p>
          <p className="mb-4">✔️ Exclusive releases and rare finds.</p>
          <p className="mb-4">✔️ Fast and secure shipping worldwide.</p>
        </div>
      </section>
    </>
  );
};

export default Home;