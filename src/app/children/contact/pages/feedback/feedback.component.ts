import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  /** Форма есть, но мы с ней никак не работаем */
  public feedbackForm : FormGroup = new FormGroup({
    name : new FormControl("", Validators.required),
    email : new FormControl("", [Validators.email, Validators.required]),
    message : new FormControl("", Validators.required)
  });

  public send(form : FormGroup){
    console.log(form.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
