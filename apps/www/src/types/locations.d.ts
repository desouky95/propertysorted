declare type Compound = {
  id: number;
  name: string;
  nameAr: string;
  location: {
    lat: number;
    lon: number;
  };
  concatName: number;
  images: string[];
  image: string;
  market_sale_price: number;
  rent_price: number;
  sizes : number[]
};


declare type Asset = {
  location_id: number;
  url: string;
}