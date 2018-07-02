import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';



import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { TagInputModule } from 'ngx-chips';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {UserResolve} from "./user.resolve";
import {FilterPipe} from "./filter.pipe";
import {ChannelService} from "./shared/channel.service";
import {ChannelComponent} from "./channel/channel.component";
import { ContentComponent } from './content/content.component';
import {ContentService} from "./shared/content.service";
import { TruncatePipe } from './limitToPipe';
import { AddContentComponent } from './add-content/add-content.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {CommonService} from './shared/common-service';
import {StatusResolve} from "./shared/status.resolve";
import {EditContentComponent} from "./content/edit-content/edit.content";




@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    FilterPipe,
    TruncatePipe,
    ChannelComponent,
    ContentComponent,
    AddContentComponent,
    EditContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({positionClass: 'toast-top-right'}),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    LayoutModule,
    TagInputModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [UserService, CommonService, ChannelService, ContentService, AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    UserResolve,
    StatusResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
