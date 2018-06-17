import { HttpHandler } from '@angular/common/http/src/backend';
import { MatGridListModule, MatInputModule } from '@angular/material';
import { ContentService } from './content/services/content.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentComponent } from './content/components/content.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { HomeComponent } from './home/components/home.component';
import { ChannelService } from './channel/services/channel.service';
import { UserService } from './user/services/user.service';
import { KhabriHeaderComponent } from './shared/components/header/khabri-header.component';
import { AppErrorHandler } from './shared/error/app-error-handler';
import { AppError } from './shared/error/app-error';
import { KhabriFooterComponent } from './shared/components/footer/khabri-footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { AnalyticsService } from 'app/@core/utils/analytics.service';

@NgModule({
  declarations: [ AppComponent,
                  LoginComponent,
                  ContentComponent,
                  HomeComponent,
                  FileSelectDirective,
                  KhabriFooterComponent,
                  KhabriHeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatInputModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: ErrorHandler, useClass: AppErrorHandler},
    UserService,
    ChannelService,
    ContentService,
    AuthGuard,
    AnalyticsService,
  ],
})
export class AppModule {
}

