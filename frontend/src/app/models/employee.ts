export class Employee {
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  job_title: string = '';
  department: string = '';
  company_name: string = '';
  language: string = '';
  gender: string = '';
  preferred_color: string = '';
  reset() {
    this.id = 0;
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.job_title = '';
    this.department = '';
    this.company_name = '';
    this.language = '';
    this.gender = '';
    this.preferred_color = '';
  }
}
