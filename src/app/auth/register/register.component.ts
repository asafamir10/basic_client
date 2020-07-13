import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute }      from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from '../user';
import {FormControl, FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmPassword="";//
  user:User = {} as User;
  isRegister=false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  
  }

  register(): void {

    this.user.firstname = this.user.firstname.trim();
    this.user.lastname=this.user.lastname.trim();
    if (!this.user.firstname || !this.user.lastname || !this.user.password || !this.user.email) { 
      window.confirm("אנא מלא את כל השדות"); 
    return;
  }
    this.authService.register(this.user.firstname,this.user.lastname,this.user.email,this.user.password,"register")
    .subscribe(data => {
        if(data["error"]){
          window.confirm(data["error"])
        }
        else {
          // נשלח
          this.isRegister=true;
          console.log(data);
          alert("thank u");
          this.router.navigateByUrl("/login");
        }
        //this.router.navigateByUrl(redirect);
      });
   }
   goToLogin(){
    this.router.navigateByUrl("/login");
   }
   back(){
    this.router.navigateByUrl("/login");
   }



}
