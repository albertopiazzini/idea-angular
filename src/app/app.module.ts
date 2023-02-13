import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsListComponent } from './posts-list/posts-list.component';

import { HttpClientModule } from '@angular/common/http';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    
    AuthenticationComponent,
    UsersListComponent,
    
    PostsListComponent,
    PostDetailComponent,
    UserDetailComponent,
    CreateNewUserComponent,
    CreateNewPostComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
