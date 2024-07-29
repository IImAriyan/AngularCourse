export class Student {
  id:number;
  firstName:string;
  lastName:string;
  age:number | string;
  forCourse:number;
  constructor(id:number =0,firstName:string = "",lastName:string = "",age:number|string = "",forCourse:number = 0) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age  = age;
    this.forCourse = forCourse;
  }
}
