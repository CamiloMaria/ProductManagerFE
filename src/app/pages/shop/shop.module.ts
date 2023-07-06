import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { SellerComponent } from './seller/seller.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltroPipe } from './pipes/filtro.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ShopRoutingModule,
        RouterModule,
        MatPaginatorModule,
        BrowserAnimationsModule
    ],
    exports: [
        AdminComponent,
        UserComponent,
        SellerComponent
    ],
    declarations: [
        AdminComponent,
        UserComponent,
        SellerComponent,
        FiltroPipe
    ],
    providers: [],
})
export class ShopModule { }