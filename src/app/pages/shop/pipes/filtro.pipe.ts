import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/model/product';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(product: Product[], page: number = 0, search: string = ''): Product[] {
    if(search.length === 0){
      return product.slice(page, page + 5);
    }
    
    const filteredProducts = product.filter(products => products.name.includes(search));
    return filteredProducts.slice(page, page + 5);

  }

}
