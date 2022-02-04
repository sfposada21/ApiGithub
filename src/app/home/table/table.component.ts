import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { timer, interval } from 'rxjs'

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
  follower: any;
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
  xAxisLabel: string = 'People';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Followers';
  multi : any

  constructor( 
    private _userService: UserService, 
    private _router: Router,
    private _snackBar: MatSnackBar) {       
      this.userData = {};
      this.listData = [];
    }

  ngOnInit(): void {    
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
          this.GetFollowers(this.listData)
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }}
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

  GetFollowers(data: any){   
    this.follower = []
    for (let i = 0; i < 10; i++) {
      this._userService.getPeople(data[i].login).subscribe(
        (res) => {
          let fo = res.followers;   
          this.follower.push(fo)  
        })         
      }  
    console.log("Prueba de seguidores")
    console.log(this.follower)
    
    const contador2 = timer(2000)
    contador2.subscribe( ()=> { 
    console.log("PRUEBA")
    this.rellenar()
    })  



   }

  rellenar(){
    this.multi = []
    for (let i = 0; i < 10; i++){
      let objeto1 = {name : "", value :  this.follower[i] }            
      let objeto2 = {name :  this.listData[i].login, series : [objeto1]}   
      this.multi.push(objeto2);  
    }
    console.log("Prueba de tabla")
    console.log(this.multi)
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
