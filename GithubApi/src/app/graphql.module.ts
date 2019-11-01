import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http'; 
import { Apollo } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';

import { ApolloClient } from 'apollo-client';

const uri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo() {

  const httpLink = new HttpLink({ uri: uri });

  const authLink = new ApolloLink((operation, forward) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('5b01fe844af653141c3ba1f562b9d7f16edb2966');
    console.log(token);
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    
    // Call the next link in the middleware chain.
    return forward(operation);
  });
  const httpLinkWithAuthToken = authLink.concat(httpLink);

  const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache(),
  });
}

@NgModule({
  exports: [ApolloModule, 
    HttpLinkModule,
  ],
  
})
export class GraphQLModule {
 
}
