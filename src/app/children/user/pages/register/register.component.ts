import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public authForm : FormGroup = new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  });


  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  register(form : FormGroup){
    let registerStatus : Boolean;
    /** Отсутствуют обработка ошибок */
    this.authService.register(form.value).subscribe(r => console.log(r));
    this.router.navigate(['profile/login'])
  }

  constructor(private authService : AuthService, private router : Router) { }

  /** Зачем это тут */
  ngOnInit(): void {
  }

}
