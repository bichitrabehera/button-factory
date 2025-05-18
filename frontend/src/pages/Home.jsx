import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <header
        id="hero"
        className="text-center h-[400px] bg-black flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to Button Factory
        </h1>
        <p className="text-xl text-gray-600">
          Your one-stop shop for custom buttons and designs.
        </p>
      </header>

      <section className="px-6 py-10 bg-gray-50 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 b-3 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-700 mb-3">
            Explore our wide range of handcrafted buttons designed to suit every
            style and need. Whether you're looking for something classic,
            quirky, or completely custom, we've got you covered.
          </p>
          <p className="text-base text-gray-600 mb-4">
            Each product is made with premium materials and meticulous attention
            to detail, ensuring quality and durability that lasts.
          </p>
          <p className="italic text-sm text-gray-500">
            (Product carousel coming soon...)
          </p>
        </div>
      </section>

      <section className="mb-12 px-6 py-1 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 b-3 mb-4">
            Custom Design Tool
          </h2>
          <p className="text-lg text-gray-700 mb-3">
            Create your own unique button designs with our easy-to-use tool.
            Upload artwork, choose sizes, and customize finishes with real-time
            previews.
          </p>
          <Link
            to="/custom-design"
            className="text-blue-700 hover:text-blue-900 font-semibold underline"
          >
            Try it now
          </Link>
        </div>
      </section>

      <section className="mb-12 px-6 py-10  rounded-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-700  pb-3 mb-4">
            Special Offers
          </h2>
          <p className="text-lg text-gray-700 mb-3">
            Don’t miss our seasonal deals and exclusive bundles. Save more when
            you buy in bulk or subscribe to our newsletter.
          </p>
          <Link
            to="/offers"
            className="text-yellow-700 hover:text-yellow-900 font-semibold underline"
          >
            View offers
          </Link>
        </div>
      </section>

      <section className="mb-12 px-6 py-10 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 pb-3 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-3">
            Have questions or need help with your order? Our friendly support
            team is here to assist you 7 days a week.
          </p>
          <Link
            to="/contact"
            className="text-green-700 hover:text-green-900 font-semibold underline"
          >
            Contact support
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
