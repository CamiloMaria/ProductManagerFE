import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { productService } from "src/app/services/products.service";
import { Product, ProductResponse } from "src/app/model/product";
import { User, UserResponse } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { map } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  @ViewChild('editProductModal') editProductModalRef!: ElementRef;
  @ViewChild('createProductModal') createProductModalRef!: ElementRef;

  product: Product[] = [];
  selectedProduct: Product;
  selectedProductEmpty: Product;
  productForm: FormGroup;

  showProducts = true;
  showUsers = false;

  searchName: string = '';
  searchPrice: number | null = null;
  filteredProducts: Product[] = [];
  totalProducts: number = 0;
  page: number = 0;
  search: string = '';

  user: User[] = [];

  
  constructor(private productService: productService,private userService: UserService, private formBuilder: FormBuilder, private renderer: Renderer2) {
    
    this.selectedProductEmpty = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      image: ''
    };

    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      image: ''
    };

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });

  };

  ngOnInit() {
    this.getProduct();
  }

  //Product---
  getProduct() {
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

  searchProducts() {
    if (!this.searchName && this.searchPrice === null) {
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
    } else {
      const filteredProducts = this.product.filter(item => {
        if (this.searchName && this.searchName.trim() !== '') {
          const productName = item.name.toLowerCase();
          const searchValue = this.searchName.toLowerCase();
          if (!productName.includes(searchValue)) {
            return false;
          }
        }

        if (this.searchPrice !== null) {
          if (item.price < this.searchPrice) {
            return false;
          }
        }
        return true;

      });
      this.product = filteredProducts;
      this.searchName = '';
    }
  }
  
  createProduct(){
    this.productService.postProducts(this.selectedProduct).subscribe({
      next: () => {
        this.getProduct();
        this.renderer.addClass(this.createProductModalRef.nativeElement, 'close');
        this.renderer.setStyle(this.createProductModalRef.nativeElement, 'display', 'none');
      }
    });
  }

  putProduct() {
    this.productService.putProducts(this.selectedProduct).subscribe({
      next: () => {
        this.getProduct();
        this.renderer.addClass(this.editProductModalRef.nativeElement, 'close');
        this.renderer.setStyle(this.editProductModalRef.nativeElement, 'display', 'none');
        
      }
    });

  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.getProduct();
      }
    });
  }
  //---!

  //Users---
  getUsers() {
    this.userService.getUsers().pipe(
      map((data: UserResponse) => {
        return data.map(items => {
          return {
            id: items.id,
            name: items.name,
            password: items.password,
            role: items.role
          };
        });
      })
    ).subscribe({
      next: (users: User[]) => {
        this.user = users;
      }
    });
  }

  //---!

  //Modal----

  openCreateProductModal() {
    this.selectedProduct = this.selectedProductEmpty
    this.renderer.addClass(this.createProductModalRef.nativeElement, 'show');
    this.renderer.setStyle(this.createProductModalRef.nativeElement, 'display', 'block');
  }
  
  openEditProductModal(item: any) {
    this.selectedProduct = { ...item };
    this.productForm.patchValue({
      name: this.selectedProduct.name,
      description: this.selectedProduct.description,
      price: this.selectedProduct.price,
      image: this.selectedProduct.image
    });
  
    this.renderer.addClass(this.editProductModalRef.nativeElement, 'show');
    this.renderer.setStyle(this.editProductModalRef.nativeElement, 'display', 'block');
  }

  closeProductModal(){
    this.renderer.addClass(this.createProductModalRef.nativeElement, 'close');
    this.renderer.setStyle(this.createProductModalRef.nativeElement, 'display', 'none');
    this.renderer.addClass(this.editProductModalRef.nativeElement, 'close');
    this.renderer.setStyle(this.editProductModalRef.nativeElement, 'display', 'none');
  }

  onSearchInputChange() {
    this.filteredProducts = this.product.filter((product: Product) => {
      const nameMatch = product.name.toLowerCase().includes(this.searchName.toLowerCase());
      const priceMatch = this.searchPrice === null || product.price >= this.searchPrice;
      return nameMatch && priceMatch;
    });
  }

  clearSearchProduct() {
    this.searchName = '';
    this.searchPrice = null;
    this.searchProducts();
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
