import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {CourseModel} from "../_models/course-model.model";
import {Student} from "../_models/student.model";
@Injectable({
  providedIn: 'root'
})
export class CourseAPIService {

  apiLink:string = "https://arian-backend.ir/api/";
  constructor(private http: HttpClient) {}

  getCourses():Observable<CourseModel[]> {
   return this.http.get<CourseModel[]>(this.apiLink+"Courses/list");
  }

  addCourse(Course : CourseModel) : Observable<CourseModel> {
    return this.http.post<CourseModel>(this.apiLink+"Courses/Add",Course)
  }

  removeCourse(id?:number) : Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(this.apiLink+"Courses/Remove/"+id)
  }

  loadStudents(id:number) : Observable<Student[]> {
    return this.http.get<Student[]>(this.apiLink+"Courses/Students/"+id);
  }

  addStudent(student: Student) :Observable<Student> {
    return this.http.post<Student>(this.apiLink+"Students/Add",{firstName:student.firstName,lastName:student.lastName,age:student.age,forCourse:student.forCourse})
  }

  removeStudent(id:number):Observable<Student[]> {
    return this.http.get<Student[]>(this.apiLink+"Students/Remove/"+id)
  }
}
