import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Info } from "../info/info";

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Info],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  question: string = "What's your name?";
  answer: string = "Unknown";
  appForm = new FormGroup({
    answer: new FormControl(''),
  });

  onSubmit(data: Partial<{answer: string | null}>) {
  this.answer = data.answer?.trim() || 'Unknown';
  console.log("Your name is " + this.answer);
}
}
