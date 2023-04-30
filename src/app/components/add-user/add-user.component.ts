import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFromServerService } from 'src/app/services/users-from-server.service';
import { User } from 'src/types/User';
import * as moment from 'moment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  // messageError!: string;
  editUserForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    secondName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    public usersFromServerService: UsersFromServerService
  ) {}

  submit() {
    const name = this.editUserForm.controls.name.value || '';
    const secondName = this.editUserForm.controls.secondName.value || '';
    const email = this.editUserForm.controls.email.value || '';
    const dateOfBirth = moment(this.editUserForm.controls.dateOfBirth.value).toDate() || new Date(Date.now());
    console.log(dateOfBirth);
    console.log(typeof dateOfBirth);

    const user: User = {
      id: null,
      name,
      secondName,
      email,
      dateOfBirth,
      dateOfRegistration: new Date(Date.now()),
    }
    console.log(email);
    this.usersFromServerService.createUser(user).subscribe(
    //   {
    //   error: () => {
    //     this.messageError = 'Unable to create user(try another email)';
    //     return this.messageError;
    //   }
    // }
    );
    this.editUserForm.reset();
    this.editUserForm.markAsUntouched();
  }
}
