import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  /** Зачем нам пустой конструктор */
  constructor() { }

  /** Зачем добавлен хук OnInit и метод для него? */
  ngOnInit(): void {
  }

}
