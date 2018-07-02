import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import {UserResolve} from "./user.resolve";
import {ChannelComponent} from "./channel/channel.component";
import {ContentComponent} from "./content/content.component";
import {AddContentComponent} from "./add-content/add-content.component";
import {StatusResolve} from "./shared/status.resolve";
import {EditContentComponent} from "./content/edit-content/edit.content";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], resolve: {user: UserResolve},
    children : [
      { path: 'channel', component: ChannelComponent },
      { path: ':id/content', component: ContentComponent},
      { path: ':id/:contentId/edit', component: EditContentComponent},
      { path: ':id/add-content', component: AddContentComponent,    data: { dataww: '' } }




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
    { path : '', redirectTo: '/login', pathMatch : 'full'}

];
