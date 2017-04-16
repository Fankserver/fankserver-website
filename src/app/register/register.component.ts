import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  doRegister(): void {
    if (this.registerForm.valid) {
      this.auth.post('/auth/register', this.registerForm.value).subscribe(
        (res) => {
          this.router.navigateByUrl('/login');
          this.snackBar.open('Registration successful', null, {
            duration: 2000,
          });
        },
        (err) => {
          switch (err.status) {
            case 400:
              this.snackBar.open('Malformed request', null, {
                duration: 20000,
              });
              break;
            case 409:
              this.snackBar.open('Username or E-Mail exists', null, {
                duration: 20000,
              });
              break;
            default:
              this.snackBar.open('Unknown error', null, {
                duration: 20000,
              });
          }

          console.error(err)
        }
      );
    }
  }
}
