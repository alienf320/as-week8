import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]  },
  { path: '',   redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
