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
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many different types</p>
      </div>
      <div className="products-container">
        {products?.map((product: IProduct) => <Product key={product._id} product={product} />)}
      </div>
      <FooterBanner />
    </div>
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
