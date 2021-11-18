import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent{

  constructor( private fb: FormBuilder ) { }

  miFormulario: FormGroup = this.fb.group({
    name: [ 'Fabio', [ Validators.required ] ],
    email: [ 'test1@test.com', [ Validators.required, Validators.email ] ],
    password: [ '123456 ', [ Validators.required, Validators.minLength(6) ] ],
  });


  registro(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }
}
