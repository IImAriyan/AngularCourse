export class CourseModel {
  id:number;
  title:string;
  date:string;
  time:string;

  constructor(id:number = 0,title:string = "",date:string = "",time:string = "") {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
  }
}
