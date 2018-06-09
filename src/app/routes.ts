import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import {UserResolve} from "./user.resolve";
import {ChannelComponent} from "./channel/channel.component";
import {ContentComponent} from "./content/content.component";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard],resolve:{user:UserResolve},
    children : [
      { path: 'channel', component: ChannelComponent },
      { path: ':id/content', component: ContentComponent }

    ]
    },

    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}

];
