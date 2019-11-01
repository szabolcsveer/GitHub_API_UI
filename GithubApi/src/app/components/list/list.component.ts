import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';
import { Data, Query } from '../../types';
import { ApiserviceService } from '../../services/apiservice.service';
import { InputfieldComponent } from '../inputfield/inputfield.component'
import { Router, ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';
// import { GraphQLModule } from '../../graphql.module';
const CurrentUserForProfile = gql`
query{
  repositoryOwner(login:"szabolcsveer"){
    avatarUrl
    login
  }
}
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  data: Observable<Data[]>
  @Input() user: string
  @Input() error: string
  querySubscription: Subscription;

  constructor(private apollo: Apollo,
    private inputfield: InputfieldComponent,
    private apiservice: ApiserviceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<Query>({
      query: CurrentUserForProfile,
      // variables: {
      //   queryString: "npm"
      // }
    }).valueChanges
      .subscribe(({ data }) => {
      });
  }

  fetchData() {
    this.inputfield.userData = this.user
  }
}
