import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel,IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonContent, IonItem, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
    email: string = 'test@test.com';
    otp: string ='123456';
    otpDisabled : boolean = true;
    login(){
      if(this.email == 'test@test.com' && this.otp == '123456'){
        // alert('Login Successful');
        this.router.navigate(['/home']);
      }
    }
    otpSend(){
      if(this.email == ''){
        alert ('please enter email')
      } else {
        this.otpDisabled = false;

      }
    }
    


}
