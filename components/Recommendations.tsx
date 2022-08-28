import { IProduct } from "../types";
import Product from "./Product";

interface Props {
  products: IProduct[];
}

const Recommendations = ({ products }: Props) => {
  return (
    <div className="maylike-products-wrapper">
      <h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {products.map((item) => (
            <Product product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
