export interface IProduct {
  image: string[];
  name: string;
  slug: string;
  price: number;
  details: string;
}

export interface Banner {
  image: string;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
}
