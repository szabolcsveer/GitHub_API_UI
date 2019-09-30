import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent implements OnInit {

  public user: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    
   }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
     console.log(params);
    });
  }

  onKey(event: KeyboardEvent) { // with type info
    this.user = (<HTMLInputElement>event.target).value;
  }

  onClickMe(event) {
    this.user = event.target.value;
  }

  goTo() {
    this.router.navigate(['/input'], { queryParams: { user: this.user } });
  }
}