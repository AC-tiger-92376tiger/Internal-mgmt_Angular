import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent{

  constructor(private router: Router) {
    
  }
  login() {
    this.router.navigate(['/login']);
  }

}
