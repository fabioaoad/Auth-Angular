import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import Swal from 'sweetalert2';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  miFormulario: FormGroup = this.fb.group({
    email: [ 'test1@test.com', [ Validators.required, Validators.email ] ],
    password: [ '123456 ', [ Validators.required, Validators.minLength(6) ] ],
  });


  constructor( private fb: FormBuilder,
               private  router: Router,
               private authService: AuthService) { }


  login(){
    //console.log(this.miFormulario.value);
    //extraigo el emial y password del formulario
   const { email, password } = this.miFormulario.value;
  // console.log(this.miFormulario.valid);
    this.authService.login( email, password )
      .subscribe( ok => {
        //console.log(ok);
        if( ok === true ){
          //Navego al usuario
          this.router.navigateByUrl('/dashboard');
        }else{
          // mostrar mensaje de error
          Swal.fire('Error', ok, 'error');
        }
      });


    this.authService.validarToken()
      .subscribe( resp => console.log(resp) );


  }

}
