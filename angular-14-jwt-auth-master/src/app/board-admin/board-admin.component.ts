import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users!:any;
  roles!:[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    this.userService.getUsers().subscribe({
        next: data => {
          this.users = data
          console.log(this.users);
          console.log(this.users.role);
          
          // console.log(this.users); 
          // this.roles = JSON.stringify(this.users.roles);
          // console.log(JSON.stringify(this.users.roles));
          
          // console.log(this.users.roles);
        }
    })
  }
}
