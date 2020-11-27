import { FollowersComponent } from './followers/followers.component';
import { FeedComponent } from './feed/feed.component';
import { SettingsComponent } from './settings/settings.component';
import { NotAuthService } from './not-auth.service';
import { AuthService } from './auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthorizationComponent,
    canActivate: [NotAuthService],
  },
  {
    path: 'registration', 
    component: AuthorizationComponent,
    canActivate: [NotAuthService],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthService],
  },
  {
    path: 'user/:id',
    component: UserPageComponent,
    canActivate: [AuthService],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthService],
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [AuthService],
  },
  {
    path: 'user/:id/followers',
    component: FollowersComponent,
    canActivate: [AuthService],
    data: {
      type: 'followers'
    }
  },
  {
    path: 'user/:id/followings',
    component: FollowersComponent,
    canActivate: [AuthService],
    data: {
      type: 'followings'
    }
  },
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
