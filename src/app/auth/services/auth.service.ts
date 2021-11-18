import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../../environments/environment";

import {AuthResponse, Usuario} from "../interfaces/interfaces";
import {catchError, map, Observable, of, pipe, tap} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {
  }



  registro( name: string, email: string, password: string ){

    const url  = `${ this.baseUrl }/auth/new`;
    const body = { name, email, password };
    // console.log(url);

    return this.http.post<AuthResponse>( url,body )
      .pipe(
        tap( resp => {
          //console.log(resp);
          if( resp.ok ){
            localStorage.setItem( 'token', resp.token! );
            this._usuario = {
              name: resp.name!,
              uid  : resp.uid!
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );



  }









  login(email: string, password: string) {
    const url  = `${ this.baseUrl }/auth`;
    const body = { email, password };
   // console.log(url);

    return this.http.post<AuthResponse>( url,body )
      .pipe(
        tap( resp => {
          //console.log(resp);
          if( resp.ok ){
            localStorage.setItem( 'token', resp.token! );
            this._usuario = {
              name: resp.name!,
              uid  : resp.uid!
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }



  validarToken(): Observable<boolean>{

    const url  = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set( 'x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
         // console.log(resp.token);
          localStorage.setItem( 'token', resp.token! );
          this._usuario = {
            name: resp.name!,
            uid  : resp.uid!
          }
          return resp.ok;
        }),
        catchError( err => of(false) )

      );


  }






  logout(){
    //limpia el localstorage pero solo de esta url no de otras apps
  localStorage.clear();


  }




}



