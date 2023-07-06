import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Product, ProductResponse } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class productService {
  url: string;
  endpoint = environment.apiUrl;

  constructor(protected http: HttpClient) {
    this.url = `${this.endpoint}/Product`;

  }
  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.url}`)
  }

  postProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}`, product)
  }

  putProducts(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product)
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`)
  }
}