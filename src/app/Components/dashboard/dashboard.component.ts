import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { ChartComponent } from '../chart/chart.component';
//import { RouterOutlet } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { TaskBoardComponent } from '../task-board/task-board.component';
import { AuthService } from '../../shared/Services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {
  @ViewChild('main', { read: ViewContainerRef }) mainContainer!: ViewContainerRef;
  loginuser: any =null;
  constructor(
    private router:Router,
    private resolver: ComponentFactoryResolver,
    private authservice: AuthService
  ) { }


  ngOnInit(): void {
    //this.loadChartComponent();
    this.checkToken();
    /*
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.loginuser = navigation.extras.state['loginuser'];
    }
      */
    this.loginuser = this.authservice.getLoginUser();
    console.log('Received loginuser:', this.loginuser);
    
  }
  ngAfterViewInit(): void {
    // Load the ChartComponent after ViewChild is initialized
    this.loadChartComponent();
    
    
  }

  checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      
      // Token exists, navigate to dashboard
      
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleDarkMode(): void {
    const bodyElement = document.body; // Get the <html> element
    bodyElement.classList.toggle('dark'); // Toggle the 'dark' class
  }
  loadChartComponent(): void {
    const factory = this.resolver.resolveComponentFactory(ChartComponent);
    this.mainContainer.clear(); // Clear the container
    this.mainContainer.createComponent(factory); // Load ChartComponent
  }

  loadTaskComponent(): void {
    const factory = this.resolver.resolveComponentFactory(TaskBoardComponent);
    this.mainContainer.clear(); // Clear the container
    this.mainContainer.createComponent(factory); // Load TaskComponent
  }
  loadUsersComponent(): void {
    const factory = this.resolver.resolveComponentFactory(UsersComponent);
    this.mainContainer.clear(); // Clear the container
    this.mainContainer.createComponent(factory); // Load TaskComponent
  }
  

}
