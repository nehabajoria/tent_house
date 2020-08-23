import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helper/auth-guard';


const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule), 
    canActivate: [AuthGuard] 
  },
  {
    path: "product",
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule), 
    canActivate: [AuthGuard] 
  },
  {
    path: "customer",
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule), 
    canActivate: [AuthGuard] 
  },
  {
    path: "transaction",
    loadChildren: () => import('./transaction/transaction.module').then(module => module.TransactionModule), 
    canActivate: [AuthGuard] 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
