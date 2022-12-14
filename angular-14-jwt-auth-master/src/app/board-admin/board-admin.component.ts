import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
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
  isLogged:any;
  currentUser:any;

  // Add user
  form: any = {
    username: null,
    email: null,
    password: null,
    role:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  formDisplayed:any;

  constructor(private userService: UserService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.isLogged = this.storageService.isLoggedIn();
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser.roles[0]);
    

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
    })
  }

  displayForm(){
       this.formDisplayed = true;
  }

  onSubmit(): void {
    const { username, email, password, role } = this.form;

    this.userService.addUser(username, email, password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
