import React from "react";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";

const links = [
  { url: "Home", slug: "/" },
];

const Products = () => {
  const { response } = useFetch("/api/v1/orders/");

  return (
    <section>
      <h3>Products</h3>
      <Navbar links={links} />

      <ul>
        {response?.results?.map((order) => (
          <p key={order.id}>{order.name}</p>
        ))}
      </ul>
    </section>
  );
};

export default Products;
