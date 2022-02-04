import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: any  
  listData: any
  textoDeInput: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 3;

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


}
