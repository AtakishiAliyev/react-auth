import React from "react";
import Navbar from "../components/Navbar";

const links = [{ url: "Products", slug: "/products" }];

const Home = () => {
  return (
    <main className="app">
      <h3>Home page</h3>
      <Navbar links={links} />
    </main>
  );
};

export default Home;
