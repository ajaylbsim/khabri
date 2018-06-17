import { ContentComponent } from './content/components/content.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { HomeComponent } from './home/components/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ExtraOptions, RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'homepage',
    component : HomeComponent,
    canActivate : [AuthGuard],
  },
  {
    path: 'content',
    component : ContentComponent,
    canActivate : [AuthGuard],
  },

];
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
