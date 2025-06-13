import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router ) { }


  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, navigate to dashboard
      
    } else {
      this.router.navigate(['/login']);
    }
  }

}
