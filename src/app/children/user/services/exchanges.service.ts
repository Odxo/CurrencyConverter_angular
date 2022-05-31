import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  constructor(private http : HttpClient) { }

  /** Отсутствуют тип возвращаемого значения */
  public get(token : String){
    let result : string[][] = [[], []];
    let result2 = new Subject<any[][]>();
    let url = "http://127.0.0.1:8000/exchanges/"
    let header = {"Host" : "localhost:4200",
      "Content-Type" : "text/plain",
      "Connection" : "keep-alive",
      "Authorization" : "Token " + token
      };

    /** Отсутствуют обработка ошибок */
    this.http.get(url, {headers: header}).subscribe(answer => {
      let data : any;
      data = answer;
      let i = 0;
      for(let e in data){
        result[0][i] = data[e].valute1
        result[1][i] = data[e].valute2
        i += 1;
      }
      result2.next(result);
    });
    return result2.asObservable();

  }

  /** Отсутствуют тип возвращаемого значения */
  public post(currency1 : String, currency2 : String, token : String){
    let url = "http://127.0.0.1:8000/exchanges/"
    let header = {"Host" : "localhost:4200",
      "Content-Type" : "application/JSON",
      "Connection" : "keep-alive",
      "Authorization" : "Token " + token
      };
    let body = {
      "valute1" : currency1,
      "valute2" : currency2
    };

    this.http.post(url, body, {headers : header}).subscribe(answer => console.log(answer));
  }

  /** Отсутствуют тип возвращаемого значения */
  public delete(currency1 : String, currency2 : String, token : String){
    let url = "http://127.0.0.1:8000/exchanges/"
    let header = {"Host" : "localhost:4200",
      "Content-Type" : "application/JSON",
      "Connection" : "keep-alive",
      "Authorization" : "Token " + token
      };
    let body = {
      "valute1" : currency1,
      "valute2" : currency2
      };

    /** Отсутствуют обработка ошибок */
    this.http.delete(url, {body : body, headers : header}).subscribe(answer => console.log(answer));
  }
}
