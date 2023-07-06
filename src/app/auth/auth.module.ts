import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [],
})
export class AuthModule { }