import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';
import { type } from 'os';
import { all } from 'q';


const CurrentUserForProfile = gql`
query ($queryString: String!) {
  repositoryOwner(login: $queryString) {
    repositories(first: 10) {
      edges {
        node {
          name
          shortDescriptionHTML
          url
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
  repositories: UserSearch
  edges: UserSearch[]
  node: string
  name: string
  error: string
}

type Response = {
  repositoryOwner: UserSearch
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
  public error: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
    });
    console.log(this.userData);
    console.log(this.error);
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
      errorPolicy: 'all',
      variables: {
        queryString: this.user
      }
    }).valueChanges
      .subscribe((result) => {
        if (result.data.repositoryOwner === null) {
          alert('No such user')
        } else {
          this.userData = result.data.repositoryOwner.repositories.edges
        }
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}