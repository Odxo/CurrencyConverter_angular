import { Component, OnInit } from '@angular/core';
import { GetValutesService } from '../../services/get-valutes.service';
import { CookieService } from 'ng2-cookies';
import { ExchangesService } from '../../../user/services/exchanges.service';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  providers: [GetValutesService, ExchangesService]
})
export class ConverterComponent implements OnInit {
  /** Отсутствуют модификаторы доступа */
  authState : boolean;
  token : string;
  /** Отсутствуют модификаторы доступа */
  input1: number = 0;
  input2: number = 0;
  coeffiency: number = 1;
  /** Отсутствуют модификаторы доступа */
  currency1: string = '';
  currency2: string = '';
  /** Отсутствуют модификаторы доступа */
  valutes : {[key : string] : number};
  keys : string[];

  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  keyUp1() {
    if (this.currency1 != "Валюта" && this.currency1 != "" && this.currency2 != "Валюта" && this.currency2 != ""){
      this.input2 = Number((this.input1 * this.coeffiency).toFixed(2));
    }
  }

  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  keyUp2() {
    if (this.currency1 != "Валюта" && this.currency1 != "" && this.currency2 != "Валюта" && this.currency2 != ""){
      this.input1 = Number((this.input2 / this.coeffiency).toFixed(2));
    }
  }

  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  onOptionChange() {
    if (this.currency1 != "Валюта" && this.currency2 != "Валюта") {
      this.coeffiency = this.valutes[this.currency1] / this.valutes[this.currency2];
    }
  }

  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  toFavourite(currency1 : String, currency2 : String, token : String){
    this.exchangesService.post(currency1, currency2, token);
  }

  constructor(private getvalutes: GetValutesService, private cookieService : CookieService, private exchangesService : ExchangesService) { }

  /** Отсутствуют модификаторы доступа */
  /** Отсутствуют тип возвращаемого значения */
  ngOnInit(): void {
    this.getvalutes.getValutes().subscribe(r => {
      this.valutes = r;
      this.keys = Object.keys(r);
    })
    if (this.cookieService.check("token")){
      this.authState = true;
      this.token = this.cookieService.get("token");
    }
    else this.authState = false;
  }

}
