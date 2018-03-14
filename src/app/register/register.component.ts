import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  lastname: String;
  firstname: String;
  email: String;
  password: String;
  successMessage: String = '';

  constructor(
    private authService: AuthService,
    private utility: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
      
  }

  onRegisterSubmit(e){
      e.preventDefault();
      const user = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password
      }
      this.authService.insertUser(user)
      .subscribe(data => {  
          this.router.navigate(['login']);
      });
  }


}
