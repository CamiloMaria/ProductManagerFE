import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { ShopModule } from './shop/shop.module';
import { PagesComponent } from './pages.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ShopModule,
        CoreModule
    ],
    exports: [
        PagesComponent
    ],
    declarations: [
        PagesComponent,
    ],
    providers: [],
})
export class PagesModule { }