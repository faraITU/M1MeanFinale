import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	authToken: any;
	user: any;

	private _getUrl = "/api/users"; 
	private _getUrl_login = "/api/login";
  	constructor(private _http: Http) { }

  	public insertUser(newUser) {
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	return this._http.post(this._getUrl, newUser, {headers:headers}).map(res => res.json());
    }

    public authenticateUser(newUser){
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	return this._http.post(this._getUrl_login, newUser, {headers:headers}).map(res => res.json());
    }
    public storeUserData(user){
    	sessionStorage.setItem('user', JSON.stringify(user));
    	this.user = user;
    }
    public logout() {
      if (typeof (Storage) !== 'undefined') {
        this.user = null;
        sessionStorage.removeItem("user");
      }
    }

     

}
