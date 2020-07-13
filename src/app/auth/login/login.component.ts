import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {} as User;
  showProgerss=false;

  constructor(private authService:AuthService,
    private router:Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user.email="";
    this.user.password="";

    if (this.isLoggedIn()) {
      this.router.navigateByUrl("home");
    }

  }
  login() {
    this.showProgerss = true;
    this.authService.login(this.user.email, this.user.password).subscribe((data) => {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl("");
    }
    else {
      window.confirm(data["error"]);
      this.showProgerss = false;

    }
  });
}

isLoggedIn(){
  if(this.authService.isLoggedIn()){
    return true;
  }
  else {
    return false;
  }
}
logout() {
  this.authService.logout();
}
goToRegister(){
  this.router.navigateByUrl("register");
}


}
