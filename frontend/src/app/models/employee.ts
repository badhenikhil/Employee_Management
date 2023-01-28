export class Employee {
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  reset() {
    this.id = 0;
    this.first_name = '';
    this.last_name = '';
  }
}
