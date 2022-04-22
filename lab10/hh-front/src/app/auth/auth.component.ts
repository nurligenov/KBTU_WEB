import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(login:string, email:string, password:string,){
    this.authService.register(login, email, password).subscribe(user => localStorage.setItem('token', user.token))
  }
  login(login:string, email:string, password:string){
    const token = localStorage.getItem('token') || '';
    this.authService.login(login, email, password, token).subscribe(user => localStorage.setItem('token', user.token))
  }

} 
