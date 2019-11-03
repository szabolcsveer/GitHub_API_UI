import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { onError } from 'apollo-link-error';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: 'https://api.github.com/graphql' });
    
    //Error Handling
    const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
    
      if (networkError) console.log(`[Network error]: ${networkError}`);

      if(operation) console.log(`Operation Error: ${operation}`)
        
      if(response) console.log(`Response Error: ${response}`);
    });

    localStorage.setItem('Authorization' ,'5ae6d8ff4d68de6bc402cffed3c8e8f66b830199' )
    const token = '5ae6d8ff4d68de6bc402cffed3c8e8f66b830199';
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : '' || null)
      });
      return forward(operation);
    });


    const httpLinkWithErrorHandling = ApolloLink.from([
      errorLink,
      concat(authMiddleware, http),
   ]);

    apollo.create({
      link: httpLinkWithErrorHandling,
      cache: new InMemoryCache(),
    });
  }
}
