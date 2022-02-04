import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  userData: any  
  listData: any
  textoDeInput: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 3;
  
  // Grafica  

  view: [number, number] = [800, 300];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';
  multi : any

  constructor( 
    private _userService: UserService, 
    private _router: Router,
    private _snackBar: MatSnackBar) {       
      this.userData = {};
      this.listData = [];
    }

  ngOnInit(): void {    
    this.GetFollowers()
  }

  SearchUser(){
    if (!this.validatorPalabra()) {
      this.message = 'INVALID WORD';
      this.openSnackBarError();
    } else{
    if (!this.validatorTexto()) {
      this.message = 'DATA INCOMPLETE';
      this.openSnackBarError();
    } else {
      this._userService.getAllPeople(this.textoDeInput).subscribe(
        (res) => {
          this.listData = res.items
          console.log(this.listData)
          this.message = "Buscando";
          this.openSnackBarSuccesfull();
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }}
  }

  valScore(data: any){
    if(data ==null || data <=0){
      localStorage.setItem('role', data);
    } else {
      localStorage.setItem('role', data);
    }
  }

  validatorTexto(){
    let val = true;
    (this.textoDeInput).length < 4 ? val=false : val=true ;
    return val
  }

  validatorPalabra(){
    let val = true;
    this.textoDeInput == "doublevpartners" ? val=false : val=true ;
    return val
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

  GetFollowers(){   
    this.multi = [
      {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    }
    ]       
   }

  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data : any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data : any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  


}
