import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UtilityService } from './../utility.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,UtilityService]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  successMessage: String = '';

  constructor(
    private _authService: AuthService,
    private utility: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
      this.utility.isLogged().then((result: boolean) => {
          if(result){
            this.router.navigate(['home']);
          }
      });

  }

  onLoginSubmit(e){
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password
      }
      this._authService.authenticateUser(user)
      .subscribe(data => { 
        console.log(data);
        if(data != "error"){
          this._authService.storeUserData(data.id);
          this.router.navigate(['home']);
        }
        else{
          this.successMessage = "Adresse ou mot de passe invalide";
          console.log('log '+this.successMessage);
          this.router.navigate(['login']);
        }
      });
  }
}
