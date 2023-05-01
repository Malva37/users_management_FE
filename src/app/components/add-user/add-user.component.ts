import { MessageComponent } from './../message/message.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFromServerService } from 'src/app/services/users-from-server.service';
import { User } from 'src/types/User';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  // messageError!: string;
  createUserForm!: FormGroup;

  constructor(
    public usersFromServerService: UsersFromServerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.createUserForm = new FormGroup({
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
  }

  createUser() {
    const name = this.createUserForm.get('name')?.value || '';
    const secondName = this.createUserForm.get('secondName')?.value || '';
    const email = this.createUserForm.get('email')?.value || '';
    const dateOfBirth = moment(this.createUserForm.get('dateOfBirth')?.value).toDate() || new Date(Date.now());

    const newUser: User = {
      id: null,
      name,
      secondName,
      email,
      dateOfBirth,
      dateOfRegistration: new Date(Date.now()),
    }
    this.usersFromServerService.createUser(newUser).subscribe({
      error: () => {
        this.dialog.open(MessageComponent, {
          data: 'Unable to create user(try another email)'
        });
      },
      next: () => {
        this.dialog.open(MessageComponent, {
          data: 'User is created, you can check it in the Users component'
        });
      }
    }

    );
    this.createUserForm.reset();
    this.createUserForm.markAsUntouched();
  }

  reset() {
    this.createUserForm.reset();
    this.createUserForm.markAsUntouched();
  }

}
