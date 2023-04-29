import { UsersFromServerService } from './../../services/users-from-server.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/types/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'secondName', 'email', 'date'];
  users = new MatTableDataSource<User>();
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public usersFromServerService: UsersFromServerService
  ) {}
  ngOnInit(): void {
    this.usersFromServerService.users$.subscribe((data) => {
      this.users = new MatTableDataSource(data);
    });

    this.users.filterPredicate = function (users, filter: string): boolean {
      return (
        users.name.toLowerCase().includes(filter) ||
        users.secondName.toLowerCase().includes(filter)
      );
    };
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
}
