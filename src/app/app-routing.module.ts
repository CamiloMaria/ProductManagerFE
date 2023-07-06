import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './shared/login.guard';

const routes: Routes = [
  { path: 'shop', component: PagesComponent,
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard] 
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
