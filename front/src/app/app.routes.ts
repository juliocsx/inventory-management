import { RouterModule, Routes } from '@angular/router';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: '', redirectTo: '/product-types', pathMatch: 'full' },
    { path: 'product-types', component: ProductTypeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule],
})
export class AppRountingModule { }