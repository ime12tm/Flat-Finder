export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  password?: string;
  role: string;
  favorites: Favorite[];
}

export interface CartProduct {
  quantity: number;
  productId: string;
}

export interface Favorite {
  isFavorite: boolean;
  productId: string;
}

export interface ButtonProps {
  text: string;
  backgroundColor: string;
  handleClick: () => void;
  isRemoveCart?: boolean;
  isRemoveFav?: boolean;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
}
export interface Flat {
  id?: string;
  createdBy: string;
  title: string;
  city: string;
  streetName: string;
  streetNumber: number;
  areaSize: number;
  hasAC: boolean;
  yearBuilt: number;
  rentPrice: number;
  description: string;
  phone: number;
  image: string;
  dateAvailable: string;
}

export interface ProductsTableProps {
  products: Product[];
  buttonConfig: ButtonProps;
}
export interface FlatTableProps {
  flats: Flat[];
  buttonConfig: ButtonProps;
}
