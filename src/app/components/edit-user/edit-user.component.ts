import { User } from 'src/types/User';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersFromServerService } from 'src/app/services/users-from-server.service';
// import { DialogData } from '../users/users.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
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
      // Validators.pattern('^[^s@]+@[^s@]+.[^s@]+$'),
      Validators.email,
    ]),
    // dateOfBirth: new FormControl('', [
    //   Validators.required,
    // ]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public usersFromServerService: UsersFromServerService
  ) {}

  onNoClick(): void {
    this.editUserForm.reset();
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close();
    const name = this.editUserForm.controls.name.value || '';
    const secondName = this.editUserForm.controls.secondName.value || '';
    const email = this.editUserForm.controls.email.value || '';
    // const dateOfBirth = this.editUserForm.controls.dateOfBirth.value as Date() || new Date();
    const user: User = {
      ...this.data,
      name,
      secondName,
      email,
      // dateOfBirth,
    }
    console.log(email);
    this.usersFromServerService.updateUser(user).subscribe();

    this.editUserForm.reset();
    this.editUserForm.markAsUntouched();
  }
}
