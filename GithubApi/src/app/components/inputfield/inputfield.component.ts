import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

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

interface githubItems{
  name: string
  shortDesc: string
  isFork: boolean
  pullRequests: number
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
    console.log(this.userData);
  }
  
  onKey(event: KeyboardEvent) { // with type info
    this.user = (<HTMLInputElement>event.target).value;
  }
  
  onClickMe(event) {
    this.user = event.target.value;
  }
  
  goTo() {
    this.router.navigate(['/'], { queryParams: { user: this.user } });
    this.querySubscription = this.apollo.watchQuery<Query>({
      query: CurrentUserForProfile,
      variables: {
        queryString: this.user
      }
    }).valueChanges
      .subscribe((result) => {
      console.log(result.data.search.edges[0].node.name)
      console.log(this.userData);
      this.userData = result.data.search.repositoryCount
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}