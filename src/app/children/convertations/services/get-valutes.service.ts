import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetValutesService {

  constructor(private http : HttpClient) { }

  /** Отсутствуют тип возвращаемого значения */
  public get(){
    let url = "https://www.cbr-xml-daily.ru/daily_json.js";
    return this.http.get(url) ;
  }

  public getValutes() : Observable<{[key : string] : number}>{
    var subject = new Subject<{[key : string] : number}>();
    let result : {[key : string] : number} = {"RUB" : 1};
    this.get().subscribe(answer =>{
      let data : any;
      data = answer;
      for (let v in data.Valute){
        result[v] = data.Valute[v].Value / data.Valute[v].Nominal;
      }
      subject.next(result);
    })
    return subject.asObservable();
  }
}
