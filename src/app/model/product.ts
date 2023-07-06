export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }

export interface ProductResponse {
  map(arg0: (item: any) => any): any;
  value: Product[];
}

  