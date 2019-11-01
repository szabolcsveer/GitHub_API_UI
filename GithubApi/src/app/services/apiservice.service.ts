import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from 'apollo-link';
import ApolloClient from 'apollo-client';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: 'https://api.github.com/graphql' });

    localStorage.setItem('Authorization' ,'47c127c39c9040b7515742088fddae6613bdb5a2' )
    const token = '47c127c39c9040b7515742088fddae6613bdb5a2';
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : '' || null)
      });
      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}
