import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { BooksComponent } from './admin/books/books.component';
import { AddbookComponent } from './admin/books/addbook/addbook.component';
import { ViewbookComponent } from './admin/books/viewbook/viewbook.component';
import { ShopbookComponent } from './shopbook/shopbook.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    BooksComponent,
    AddbookComponent,
    ViewbookComponent,
    ShopbookComponent,
    LoginComponent,
    LogoutComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
