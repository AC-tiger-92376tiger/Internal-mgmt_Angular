
import { Component, OnInit } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ComponentFactoryResolver } from '@angular/core';
import { AdduserComponent } from '../adduser/adduser.component';
import { ViewChild, ViewContainerRef } from '@angular/core';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-users',
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})



export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  @ViewChild('main', { read: ViewContainerRef }) mainContainer!: ViewContainerRef;
  
  constructor( private resolver: ComponentFactoryResolver ) { }

  ngOnInit(): void {
    this.users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive' },
      { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Manager', status: 'Active' },
    ];
    this.filteredUsers = [...this.users];
  }

  loadAddUserComponent(): void {
    const factory = this.resolver.resolveComponentFactory(AdduserComponent);
    const componentRef = this.mainContainer.createComponent(factory);

    // Apply modal styles
    const modalElement = componentRef.location.nativeElement;
    modalElement.style.position = 'fixed';
    modalElement.style.top = '50%';
    modalElement.style.left = '50%';
    modalElement.style.transform = 'translate(-50%, -50%)';
    modalElement.style.zIndex = '1000';
    modalElement.style.backgroundColor = 'white';
    modalElement.style.padding = '20px';
    modalElement.style.borderRadius = '8px';
    modalElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    // Close modal logic
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '10px';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
      componentRef.destroy(); // Destroy the modal component
    });
    modalElement.appendChild(closeButton);
  }

  searchUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    this.searchUsers(); // Refresh search results
  }
}

