import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { AuthService } from '../../services/auth.service';
import { ExchangesService } from '../../services/exchanges.service';
import { GetValutesService } from '../../../convertations/services/get-valutes.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService, CookieService, ExchangesService]
})
export class ProfileComponent implements OnInit {

  exchanges : string[][];
  exchanges1 : string[];
  exchanges2 : string[];
  input1: number = 0;
  input2: number = 0;
  token : string;

  coeffiences : number[];

  valutes : {[key : string] : number};
  inputs : Number[] = [];
  inputs2 : Number[] = [];


  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  keyUp1(){
    for(let i = 0; i < this.inputs.length; i++){
      this.inputs2[i] = Number((Number(this.inputs[i]) * this.coeffiences[i]).toFixed(2));
    }
  }


  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  keyUp2(){
    for(let i = 0; i < this.inputs.length; i++){
      this.inputs[i] = Number((Number(this.inputs2[i]) / this.coeffiences[i]).toFixed(2));
    }
  }


  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  remove(event : Event){
    let elementId: number = Number((event.target as Element).id);
    this.exchangesService.delete(this.exchanges1[elementId], this.exchanges2[elementId], this.token);
    document.getElementById(elementId.toString()).remove();
  }


  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  exit(){
    this.authService.exit(this.cookieService.get("token"));
    this.cookieService.delete('token', '/');
    this.router.navigate(['profile/login'])
  }


  constructor(private exchangesService : ExchangesService, private cookieService: CookieService, private authService : AuthService, private getValutes : GetValutesService, private router:Router) { }


  /** Отсутствуют модификаторы доступа */
  ngOnInit(): void {
    this.getValutes.getValutes().subscribe(r => this.valutes = r);
    console.log(this.cookieService.get("token"));
    this.token = this.cookieService.get("token");
    let exchanges = this.exchangesService.get(this.token).subscribe(r => {
      let data = r;
      this.exchanges1 = data[0];
      this.exchanges2 = data[1];
      let coeffiences = [];
      for(let j = 0; j < this.exchanges1.length; j++){
        coeffiences[j] = (Number((this.valutes[this.exchanges1[j]] / this.valutes[this.exchanges2[j]]).toFixed(2)));
      }
      this.coeffiences = coeffiences;
      });
  }
}
