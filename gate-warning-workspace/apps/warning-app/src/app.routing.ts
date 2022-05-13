import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './app/auth/pages/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes), ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
