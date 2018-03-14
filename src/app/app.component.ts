import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  motcle = String;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  onEnter() {
    this.router.navigate(['/search', {r: this.motcle}]);
  }

  
}
