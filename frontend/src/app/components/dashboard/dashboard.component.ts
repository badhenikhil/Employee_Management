import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employeeForm!: FormGroup;
  listEmployee!: Employee[];
  editing!: boolean;
  employeeObj!: Employee;
  ngOnInit(): void {
    this.initForm();
  }
  constructor(private apiService: ApiService, private router: Router) {
    this.resetEmployeeList();
    this.editing = false;
    this.employeeObj = new Employee();
  }
  private resetEmployeeList() {
    this.apiService.getAllEmployees().subscribe((result) => {
      this.listEmployee = result;
    });
  }
  private initForm() {
    this.employeeForm = new FormGroup({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null),
      job_title: new FormControl(null),
      department: new FormControl(null),
      company_name: new FormControl(null),
      language: new FormControl(null),
      gender: new FormControl(null),
      preferred_color: new FormControl(null),
    });
  }
  public addEmployee() {
    this.employeeObj.reset();

    this.apiService
      .createEmployee(Object.assign(this.employeeObj, this.employeeForm.value))
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetEmployeeList();
          alert('employee added!');
        },
        error: (e) => {
          alert(e);
        },
        complete: () => {
          const ref = document.getElementById('cancel-modal');
          ref?.click();
          this.editing = false;
        },
      });
  }
  public updateEmployee() {
    //this.employeeObj.first_name = this.employeeForm.value.first_name;
    //this.employeeObj.last_name = this.employeeForm.value.last_name;
    this.apiService
      .updateEmployee(
        Object.assign({ id: this.employeeObj.id }, this.employeeForm.value)
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetEmployeeList();
          alert('employee updated!');
        },
        error: (e) => {
          alert(e);
        },
        complete: () => {
          const ref = document.getElementById('cancel-modal');
          ref?.click();
          this.editing = false;
        },
      });
  }
  public onEditEmployee(employee: Employee, event: any) {
    event.stopPropagation();
    this.employeeObj.reset();
    this.employeeObj.id = employee.id;
    this.editing = true;
    this.employeeForm.patchValue(employee);
  }
  public onSelect(employee: Employee) {
    this.router.navigate([`employees`, employee.id]);
  }
  public onEnter(e: any) {
    console.log(e.target.value);
    this.apiService
      .searchEmployees(e.target.value)
      .subscribe((filteredList) => {
        this.listEmployee = filteredList;
      });
  }
}
