import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../model/User ';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  list: any;
  l: User[];
  json;
  jso;
  constructor(private HttpClient: HttpClientService) {
    this.HttpClient.getUsers().subscribe(response => this.handleSuccessfulResponse(response));
    // for(var i=0;i<this.l.length;i++){
    //   console.log("users "+this.l[i]);
    // }    
  }

  ngOnInit() {
  }

  handleSuccessfulResponse(response) {
    this.list = response;
    this.l = new Array<User>();
    for (const book of this.list) {
      const user = new User();
      user.id = book.id;
      user.name = book.name;
      user.type = book.type;
      user.password = book.password;
      this.l.push(user);
    }
  }
  //   getUsers(): void {
  //     this.HttpClient.getUsers().then(users => {
  //            this.users = users
  //            console.log('this.users=' + this.users);
  //         });


  // }
  checkuser() {

    // this.HttpClient.getUsers().subscribe((response:Array<User>) => {
    //   this.list=response;
    //   console.log("res"+response);
    //   this.list.forEach((element=>{
    //     this.l.push(element);
    //   }))  
    //   this.json=JSON.stringify(this.l);
    //   console.log(this.json);
    // })
    // this.list.forEach((element=>{
    //   this.l.push(element);
    //   console.log("users "+element);

    // }))  
    // for(var i=0;i<this.list.length;i++){
    //     console.log("users "+this.list[i]);
    //   }

    this.jso = this.json;

    // for(var i=0;i<this.l.length;i++){
    //   console.log("users" +this.l[i].name);
    // }
    // console.log("users" +this.l);
    // return this.jso;
  }

  flag;
  data = [{
    name: "yamini",
    password: "Password@4",
    type: 'admin'

  }, {
    name: "impana",
    password: "Password@45",
    type: 'user'
  },
  ]

  authenticate(username, password) {
    // this.json=this.checkuser();
    console.log("json"+this.l.length);
    // this.json=JSON.stringify(this.l);
    // console.log("12"+this.json);
    for(var i=0;i<this.l.length;i++){
      console.log("value"+ this.l[i].name);
    }
    for (var i = 0; i < this.l.length; i++) {

      if (username === this.l[i].name && password === this.l[i].password && this.l[i].type === 'admin' || this.l[i].type === 'user') {
        sessionStorage.setItem('username', username)
        this.flag = true;
        break;
      } else {
        this.flag = false;
      }
    }
    return this.flag;

  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  isUserAdmin() {
    let user = sessionStorage.getItem('username');
    let type, flag;
    console.log("json-1"+this.l.length);
    // this.json=JSON.stringify(this.l);
    // this.checkuser();
    for (var i = 0; i < this.l.length; i++) {
      if (user === this.l[i].name) {
        type = this.l[i].type;
        console.log("hi" + type);
        if (type === 'admin') {
          flag = true;
        } else {
          flag = false;
        }
      }
    }
    console.log("12 " + this.flag);
    return flag;
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
