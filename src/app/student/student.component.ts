import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../services/student.service';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  id: any;
  // @ts-ignore
  searchTerm: string;
  // @ts-ignore
  searchTag: string;
  constructor(private studentService: StudentService) {
    this.getDataAll();
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }
  // tslint:disable-next-line:typedef
  getDataAll(){
    this.studentService.getAll().pipe(
      map(res => {
        Object.assign( res, {
          average: [],
          tagArray: []
        });
        this.students = res;
        return {
          // @ts-ignore
          studentsInApi: res.students.map(student => {
            this.id = student.id;
            // @ts-ignore
            // tslint:disable-next-line:only-arrow-functions typedef
            const gradesArrayTotal = student.grades.map( i => Number(i)).reduce(function(a, b) {
              return (a + b);
            });
            student.average = (gradesArrayTotal) / 8 ;
            student.tagArray = [];
          })
        };
      })
    ).subscribe();
  }
}
