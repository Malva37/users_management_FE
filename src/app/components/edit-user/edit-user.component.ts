import { User } from 'src/types/User';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFromServerService } from 'src/app/services/users-from-server.service';
import * as moment from 'moment';;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public usersFromServerService: UsersFromServerService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editUserForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      secondName: new FormControl(this.data.secondName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
      ]),
      dateOfBirth: new FormControl(this.data.dateOfBirth, [
        Validators.required,
      ]),
    });
  }

  onNoClick(): void {
    this.editUserForm.reset();
    this.dialogRef.close();
  }

  editUser() {
    this.dialogRef.close();
    const name = this.editUserForm.get('name')?.value || '';
    const secondName = this.editUserForm.get('secondName')?.value || '';
    const email = this.editUserForm.get('email')?.value || '';
    const dateOfBirth = this.normalizeDate(this.editUserForm.get('dateOfBirth')?.value) || new Date(Date.now());
    const user: User = {
      ...this.data,
      name,
      secondName,
      email,
      dateOfBirth,
    }

    this.usersFromServerService.updateUser(user).subscribe();
    this.editUserForm.reset();
    this.editUserForm.markAsUntouched();
  }

  normalizeDate(data: Date) {
    return moment(data).toDate()
  }
}
