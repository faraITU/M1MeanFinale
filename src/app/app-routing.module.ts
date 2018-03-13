import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
   {path: '', redirectTo:'/home', pathMatch:'full'},
   {path: 'home', component: HomeComponent},
   {path: 'login', component: LoginComponent},
   {path: 'videos', component: VideoCenterComponent},
   {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
