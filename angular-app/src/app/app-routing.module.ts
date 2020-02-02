import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: 'module1', loadChildren: () => import('./module1/module1.module').then(m => m.Module1Module) },
  { path: 'module2', loadChildren: () => import('./module2/module2.module').then(m => m.Module2Module) },
  { path: 'module3', loadChildren: () => import('./module3/module3.module').then(m => m.Module3Module) },
  { path: 'module4', loadChildren: () => import('./module4/module4.module').then(m => m.Module4Module) },
  { path: 'module5', loadChildren: () => import('./module5/module5.module').then(m => m.Module5Module) },
  { path: 'module6', loadChildren: () => import('./module6/module6.module').then(m => m.Module6Module) },
  { path: 'module7', loadChildren: () => import('./module7/module7.module').then(m => m.Module7Module) },
  { path: 'module8', loadChildren: () => import('./module8/module8.module').then(m => m.Module8Module) },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: WelcomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
