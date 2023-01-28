import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;
  ngOnInit(): void {
    let id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.apiService.getEmployee(id).subscribe({
      next: (data: Employee) => (this.employee = data),
    });
  }
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
}
