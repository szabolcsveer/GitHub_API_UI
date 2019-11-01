import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';
import { type } from 'os';

const CurrentUserForProfile = gql`
query ($queryString: String!) {
  search(query: $queryString, type: REPOSITORY, first: 20) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          shortDescriptionHTML
          isFork
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
}
`;

type UserSearch = {
  repositoryCount: number;
  edges: UserSearch[]
  node: string
  name: string
}

type Response = {
  search: UserSearch
}
@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent implements OnInit {

  public user: string;
  querySubscription: Subscription;
  public userData: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apollo: Apollo ) {
   }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
    });
  }
  
  onKey(event: KeyboardEvent) { // with type info
    this.user = (<HTMLInputElement>event.target).value;
  }
  
  onClickMe(event) {
    this.user = event.target.value;
  }
  
  goTo() {
    this.router.navigate(['/'], { queryParams: { user: this.user } });
    this.querySubscription = this.apollo.watchQuery<Response>({
      query: CurrentUserForProfile,
      variables: {
        queryString: this.user
      }
    }).valueChanges
      .subscribe((result) => {
      this.userData = result.data.search.edges
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}