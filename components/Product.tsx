import Link from "next/link";

import { IProduct } from "../types";
import { urlFor } from "../lib/client";

type Props = {
  src?: string | undefined;
  product: IProduct
};

const Product = ({ product }: Props) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(product.image && product.image[0])}
            width={250}
            height={250}
            className="product-image"
            alt="Product image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
