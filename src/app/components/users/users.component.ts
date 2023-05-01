import { UsersFromServerService } from './../../services/users-from-server.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/types/User';
import { EditUserComponent } from './../edit-user/edit-user.component';
import { FormControl } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'name',
    'secondName',
    'email',
    'dateOfRegistration',
    'rename',
    'delete',
  ];
  users = new MatTableDataSource<User>();
  currentUser!: User;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    public usersFromServerService: UsersFromServerService
  ) {}

  ngOnInit(): void {
    this.usersFromServerService.users$.subscribe((data) => {
      this.users.data = data;
    });

    this.users.filterPredicate = function (users, filter: string): boolean {
      return (
        users.name.toLowerCase().includes(filter) ||
        users.secondName.toLowerCase().includes(filter)
      );
    };

    this.users.sort = this.sort;
  }

  ngAfterViewInit() {
    this.users.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.users.filter = filterValue.trim().toLowerCase();
  }

  onRename(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        id: user.id,
        name: user.name,
        secondName: user.secondName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      },
    });
  }

  onDelete(id: number) {
    this.usersFromServerService.deleteUser(id).subscribe();
  }
}
