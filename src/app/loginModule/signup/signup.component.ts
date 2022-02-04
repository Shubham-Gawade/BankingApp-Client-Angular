import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { LoginModuleService } from "../login-module.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginModuleService: LoginModuleService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.signupForm = this.fb.group({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      phoneno: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      //addresses: new FormArray([new FormControl('', Validators.required)]),
      age: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      dateofbirth: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get getSignupFormControls() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {}

  formatLabel(value: number) {
    if (value >= 1) {
      return value + "yr";
    }
    return value;
  }

  // addInputControl() {
  //   (this.signupForm.controls['addresses'] as FormArray).push(new FormControl('', Validators.required));
  // }

  // removeInputControl(idx: number) {
  //   (this.signupForm.controls['addresses'] as FormArray).removeAt(idx);
  // }

  submitForm() {
    const userSaveData = {
      firstname: this.signupForm.get("firstname")?.value,
      lastname: this.signupForm.get("lastname")?.value,
      mobile: this.signupForm.get("phoneno")?.value,
      gender: this.signupForm.get("gender")?.value,
      //addresses: this.signupForm.get('addresses')?.value,
      age: this.signupForm.get("age")?.value,
      email: this.signupForm.get("email")?.value,
      dateofbirth: this.signupForm.get("dateofbirth")?.value,
      password: this.signupForm.get("password")?.value,
    };

    console.log(userSaveData);

    this.loginModuleService.saveUser(userSaveData).subscribe(
      (response) => {
        if (response.statusCode == 201) {
          this.createNotification(
            "success",
            "Success",
            response.message,
            "topRight"
          );
          this.router.navigate(["/login"]);
        } else if (response.statusCode == 400) {
          this.createNotification(
            "error",
            "Error",
            response.message,
            "topRight"
          );
          this.router.navigate(["/signup"]);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.signupForm.reset();
  }

  createNotification(
    type: string,
    title: string,
    message: string,
    position: any
  ) {
    this.notification.create(type, title, message, {
      nzStyle: {
        marginTop: "50px",
      },
    });
  }
}
