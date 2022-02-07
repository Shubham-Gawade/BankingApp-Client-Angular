import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginModuleService } from '../login-module.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetpassForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private loginModuleService: LoginModuleService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.forgetpassForm = fb.group({
      email: new FormControl('', [Validators.required]),
    });
  }

  get getformControl() {
    return this.forgetpassForm.controls;
  }

  ngOnInit(): void {}

  submitForm() {
    const data = {
      email: this.forgetpassForm.get('email')?.value,
    };

    this.loginModuleService.forgetPassword(data).subscribe(
      (response) => {
        if (response.statusCode == 201) {
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          );
          this.router.navigate(['/login']);
        } else if (response.statusCode == 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message
          );
          this.router.navigate(['/forget-password']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.forgetpassForm.reset();
  }
}
