import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { FibModel } from "../fib-model";

@Component({
  selector: 'app-fibonacci-calculator',
  templateUrl: './fibonacci-calculator.component.html',
  styleUrls: ['./fibonacci-calculator.component.css']
})
export class FibonacciCalculatorComponent implements OnInit {

  ERROR_MSG: string = "Wprowadzono złe dane (Pożądany zakres to 0-20)";
  errorOccurred: boolean = false;

  allEnteredIndexes: FibModel[] | undefined;
  calculatedValues: FibModel[] | undefined;

  ngOnInit(): void {
    this.downloadAllEnteredFibIndexes();
    this.downloadCalculatedValues();
    /*interval(1000).pipe(
      mergeMap(() => this.apiService.getAllEnteredFibIndexes())
    ).subscribe(
      data => {
          this.allEnteredIndexes = data;
      }
    )*/
  }

  constructor(private apiService: ApiService) {}

  get f() {
    return this.form.controls;
  }

  form = new FormGroup({
    number: new FormControl('', Validators.required),
  });

  calculateFib() {
    this.errorOccurred = false;

    let inputNumber = Number(this.form.get('number')?.value);

    if (Number.isInteger(inputNumber) && (inputNumber >= 0 && inputNumber <= 20)) {

      const fibModel: FibModel = {
        fibIndex: this.form.get('number')?.value,
        fibValue: ''
      }
      this.apiService.sendFibIndex(fibModel).subscribe(
        data => {
          console.log("Request sent");
          setTimeout(() => { this.downloadAllEnteredFibIndexes() }, 1000);
          setTimeout(() => { this.downloadCalculatedValues() }, 1000);
        }
      )

    } else {
      this.errorOccurred = true;
    }
  }

  downloadAllEnteredFibIndexes() {
    this.apiService.getAllEnteredFibIndexes().subscribe(
      indexes => {
        this.allEnteredIndexes = indexes;
      }
    )
  }

  downloadCalculatedValues() {
    this.apiService.getCalculatedValues().subscribe(
      values => {
        this.calculatedValues = values;
      }
    )
  }
}
