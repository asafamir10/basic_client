import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;
  constructor(private userService :UserService,
     private router:Router,
     private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getUsers()
    .subscribe(data => {
      if(data){
        this.users= data;
        console.log(this.users);
      }
    });
  }


}
