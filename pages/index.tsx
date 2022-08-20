import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import { IProduct, Banner } from "../types";

interface IProps {
  products: IProduct[];
  bannerData: Banner[];
}

const Home = ({ products, bannerData }: IProps) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many different types</p>
      </div>
      <div className="products-container">
        {["Product 1", "Product 2"].map((product) => product)}
      </div>
      <FooterBanner />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
}; // grab all products and banners from sanity dashboard

export default Home;
