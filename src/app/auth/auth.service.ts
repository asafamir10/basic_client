import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = "http://localhost:3000/api/users/";
  user:any;
  authToken:any;
  _id;


  constructor(private http: HttpClient, private router:Router) { }


  register (firstname: string,lastname: string, email:string,password:string,type:string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var user = {
      user:{
      email:email, 
      password:password, 
      firstname:firstname,
      type:"register",
      lastname:lastname
    }
  };
   return this.http.post<Object>(this.usersUrl + 'register', user, httpOptions)
  }

  login (email,password): Observable<Object> {
    const urlAuth = "http://localhost/auth/login"; 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var user = {
      email:email, 
      password:password, 
    };
   return this.http.post<Object>(urlAuth, user, httpOptions).pipe(
    tap((data: Object) => {
    if(data["error"]){
      console.log(data["error"]);
    }
    else{
      this.storeUserData(data["token"],data["user"],data["expireTime"]);
      this.loadToken();
    }
    })
  );
  }//end of login
  loadToken()
  {
      this.authToken = localStorage.getItem("id_token");;
      this._id = localStorage.getItem("_id");
  }
storeUserData(token, user,expireTime)
{
    localStorage.setItem("id_token", token);
    localStorage.setItem("expireTime", expireTime);
    localStorage.setItem("_id",user._id);
    localStorage.setItem("user",JSON.stringify(user));
    this.user = user;
    this.authToken=token;
    this._id = user._id;
}
logout()
{
  localStorage.setItem("id_token", null);
  localStorage.setItem("expireTime", null);
  localStorage.setItem("_id",null);
  localStorage.setItem("user",null);
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}
isLoggedIn()
{
  //TODO - send req to server to show isLogged in 
    const t = localStorage.getItem("id_token");
    if(!t){
      this.logout();
      return false;
    }
    const streT =  localStorage.getItem("expireTime");
    if(!streT){

      this.logout();

      return false;
    }
    const neT = +streT;
    const now = Date.now() + 0;
    var sub = neT - now;
    if(neT > now){
      return true;
    }
    this.logout();
    return false;  
}



  

}
