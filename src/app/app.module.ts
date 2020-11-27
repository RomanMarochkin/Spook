import { NotAuthService } from './not-auth.service';
import { MainService } from './main.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ValidationComponent } from './validation/validation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthService } from './auth.service';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { FollowersComponent } from './followers/followers.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AuthorizationComponent,
    ValidationComponent,
    PageNotFoundComponent,
    UserPageComponent,
    UsersComponent,
    HeaderComponent,
    PostComponent,
    CommentComponent,
    SettingsComponent,
    FeedComponent,
    FollowersComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    MainService,
    AuthService,
    NotAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }