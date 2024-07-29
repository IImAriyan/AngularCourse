import {Component, OnInit} from '@angular/core';
import {CourseAPIService} from "../../_services/course-api.service";
import {MaterialIcon} from "material-icons";
import {MatIcon} from "@angular/material/icon";
import {CourseModel} from "../../_models/course-model.model";
import {AsyncPipe, NgForOf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Student} from "../../_models/student.model";


@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    FormsModule,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css'
})
export class ApiComponent {
  Courses$: CourseModel[] = [];
  Students$: Student[] = [];
  isShow: string = 'none';
  CourseModels: CourseModel = new CourseModel();
  StudentModels: Student = new Student();
  CourseTitle : string = 'Unknown';
  CourseDate : string = 'xxxx-xx-xx';
  CourseTime : string = 'xx:xx:xx';
  defaultCourseID: number = 0;
  loadCourses(){
    this.apiService.getCourses().subscribe(data=>{
      this.Courses$ = data;
    })
  }
  constructor(private apiService : CourseAPIService) {
    // get courses
    this.loadCourses()
  }


  addCourse () {
    this.apiService.addCourse(this.CourseModels).subscribe((data:CourseModel)=>{
      this.loadCourses()
    })
  }

  removeCourse(id:number,elementID:number) {
    this.apiService.removeCourse(id).subscribe((data: CourseModel[])=>{
      this.Courses$.splice(elementID,1)
    })
  }



  loadStudents(id:number) {
    this.apiService.loadStudents(id).subscribe(data=>{
      this.Students$ =data
    })
  }

  addStudent() {
    this.StudentModels.forCourse = this.defaultCourseID;
    this.apiService.addStudent(this.StudentModels).subscribe((data: Student)=>{
      this.loadStudents(this.defaultCourseID);
    })
  }

  closeCoursePanel() {
    this.isShow = 'none';
  }

  openCourse(id:number,title:string,date:string,time:string){
    this.isShow = 'flex'
    this.CourseTitle = title;
    this.CourseDate = date;
    this.CourseTime = time;
    this.defaultCourseID = id;
    this.loadStudents(id);
  }

}
