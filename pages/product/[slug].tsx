import { GetStaticPaths } from "next";
import { client, urlFor } from "../../lib/client";
import { IProduct } from "../../types";

interface Props {
  product: IProduct;
  products: IProduct[];
}

const ProductDetails = ({ product, products }: Props) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} alt="" />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, index) => (
              <img
                src={urlFor(item)}
                className=""
                onMouseEnter={() => {}}
                key={`image-${index}`}
              />
            ))}
          </div> */}
        </div>
      </div>
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
