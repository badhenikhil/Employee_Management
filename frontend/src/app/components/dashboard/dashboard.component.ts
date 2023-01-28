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
      firstName: new FormControl(null),
      lastName: new FormControl(null),
    });
  }
  public addEmployee() {
    this.employeeObj.reset();
    this.employeeObj.first_name = this.employeeForm.value.firstName;
    this.employeeObj.last_name = this.employeeForm.value.lastName;
    this.apiService.createEmployee(this.employeeObj).subscribe({
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
    this.employeeObj.first_name = this.employeeForm.value.firstName;
    this.employeeObj.last_name = this.employeeForm.value.lastName;
    this.apiService.updateEmployee(this.employeeObj).subscribe({
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
  public onEditEmployee(employee: Employee) {
    this.employeeObj.reset();
    this.employeeObj.id = employee.id;
    this.editing = true;
    this.employeeForm.patchValue({
      firstName: employee.first_name,
      lastName: employee.last_name,
    });
  }
  public onSelect(employee: Employee) {
    this.router.navigate([`employees`, employee.id]);
  }
}
