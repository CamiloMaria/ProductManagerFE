import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SellerComponent } from './seller/seller.component';
import { UserComponent } from './user/user.component';
import { RoleGuard } from 'src/app/shared/RoleGuard.guard';


const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent,
    data: { role: 'admin'},
    canActivate: [RoleGuard],
    canLoad: [RoleGuard]
  },
  { 
    path: 'user', 
    component: UserComponent,
    data: { role: 'user'},
    canActivate: [RoleGuard],
    canLoad: [RoleGuard]
  },
  { 
    path: 'seller', 
    component: SellerComponent,
    data: { role: 'seller'},
    canActivate: [RoleGuard],
    canLoad: [RoleGuard]
  },
  { path: '', redirectTo:'user', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopRoutingModule { }