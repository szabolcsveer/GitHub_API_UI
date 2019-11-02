import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { ApolloModule, APOLLO_OPTIONS, Apollo } from "apollo-angular";
import { InMemoryCache } from "apollo-cache-inmemory";



//Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

//Components
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListComponent } from './components/list/list.component';
import { ApolloLink } from 'apollo-link';
import { NgxPaginationModule } from 'ngx-pagination';

// import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    InputfieldComponent,
    PageNotFoundComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
    HttpClientModule, 
    ApolloModule,
    HttpLinkModule,
    MatListModule,
    NgxPaginationModule
  ],
  exports:[
    NgxPaginationModule,
    ListComponent
  ],
  bootstrap: [AppComponent],
  providers: [InputfieldComponent]
})
export class AppModule {
 
}

