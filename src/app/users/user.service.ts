import { Injectable } from '@angular/core';
import { User } from '../auth/user';
//import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any;
  userSelected;
  _id;
  token;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("id_token");
    //this._id = localStorage.getItem("_id");  
   }
   getUsers (): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var user = localStorage.getItem("user");
    var parseUser = JSON.parse(user);
    var userId = {_id :parseUser["_id"] };
    var finalurl =  "http://localhost:3000/api/users/getall?access_token=" + this.token;
    return this.http.post<User[]>(finalurl,userId,httpOptions)
  }


   
}
