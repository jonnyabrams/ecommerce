import { GetStaticPaths } from "next";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useState } from "react";

import Recommendations from "../../components/Recommendations";
import { client, urlFor } from "../../lib/client";
import { IProduct } from "../../types";

interface Props {
  product: IProduct;
  products: IProduct[];
}

const ProductDetails = ({ product, products }: Props) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0)

  console.log(image)

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" alt="" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image' }
                onMouseEnter={() => setIndex(i)}
                key={`image-${i}`}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">£{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => {}}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                0
              </span>
              <span className="plus" onClick={() => {}}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => {}}>
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={() => {}}>
              Buy now
            </button>
          </div>
        </div>
      </div>
      <Recommendations products={products} />
    </div>
  );
};

// Stack Overflow solution to getStaticPaths error:

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: 'blocking' //indicates the type of fallback
//   }
// }

// JSM solution:

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product: IProduct) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
