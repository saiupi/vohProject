import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit() {}
  Navigatehomepage()
  {
    this.router.navigate(['/']); 
  }

}
