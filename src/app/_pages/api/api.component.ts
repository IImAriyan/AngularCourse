import {Component} from '@angular/core';
import {CourseAPIService} from "../../_services/course-api.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2"
import {MatIcon} from "@angular/material/icon";
import {CourseModel} from "../../_models/course-model.model";
import {AsyncPipe, NgForOf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Student} from "../../_models/student.model";
import {LoaderComponent} from "../../_components/loader/loader.component";
import {delay} from "rxjs";


@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    FormsModule,
    AsyncPipe,
    NgStyle,
    LoaderComponent
  ],
  templateUrl: './api.component.html',
  styleUrl: './api.component.css'
})
export class ApiComponent {
  Courses$: CourseModel[] = [];
  Students$: Student[] = [];
  itsLoading: string = 'flex';
  maxlength:number = 10;
  isShow: string = 'none';
  CourseModels: CourseModel = new CourseModel();
  StudentModels: Student = new Student();
  CourseTitle : string = 'Unknown';
  CourseDate : string = 'xxxx-xx-xx';
  CourseTime : string = 'xx:xx:xx';
  maxLengthText:string = "0/"+this.maxlength;
  defaultCourseID: number = 0;
  students:number = 0;


  setMaxLength (){
    this.maxLengthText = this.Students$.length+"/"+this.maxlength;
    this.students = this.Students$.length;
  }


  loadCourses(){
    this.apiService.getCourses().subscribe(data=>{
      this.Courses$ = data;
      this.setMaxLength();
      setTimeout(()=>{
        this.itsLoading = 'none';
      },900)
    })
  }
  constructor(private apiService : CourseAPIService,private toast : ToastrService) {
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
      this.setMaxLength();
      this.itsLoading = 'none';
    })
  }

  addStudent() {
    this.StudentModels.forCourse = this.defaultCourseID;
    if (this.students == this.maxlength) {
      this.isShow='none';
      Swal.fire({
        icon:"error",
        title:"Error !!!",
        text:"Course capacity is full"
      })
    }else {
      this.apiService.addStudent(this.StudentModels).subscribe((data: Student)=>{
        this.loadStudents(this.defaultCourseID)
        this.setMaxLength();
      })
    }

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
    this.setMaxLength();
  }




  removeStudent(id:number,elementID:number) {
    this.apiService.removeStudent(id).subscribe((data:Student[])=>{
      this.Students$.splice(elementID,1)
      this.setMaxLength();
    })
  }


  protected readonly console = console;
}
