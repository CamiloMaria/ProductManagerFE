import { Component, OnInit  } from "@angular/core";
import { productService } from "src/app/services/products.service";
import { Product, ProductResponse } from "src/app/model/product";
import { map } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css',
    './style.css',
  ]
})

export class UserComponent implements OnInit {

  product: Product[] = [];
  totalProducts: number = 0;
  page: number = 0;
  search: string = '';

  constructor(private productService: productService) {   
  };

  ngOnInit() {
    this.productService.getProducts().pipe(
      map((data: ProductResponse) => {
        return data.map(item => {
          return {
            id: item.id,
            name: item.name,
            image: item.image,
            description: item.description,
            price: item.price
          };
        });
      })
    ).subscribe({
      next: (products: Product[]) => {
        this.product = products;
      }
    });
  }

  onSearchChange(search: string) {
    this.page = 0;
    search = this.capitalizeFirstLetter(search);
    this.search = search;
  }


  nextPage(){
    this.page += 5;
  }

  prevPage(){
    if(this.page > 0)
    this.page -= 5;
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  logout() {
    localStorage.removeItem('token');

    window.location.reload();
  }

}
