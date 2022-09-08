import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { CourseEntityService } from "../services/courses-entity.service";
import { CoursesHttpService } from "../services/courses-http.service";
import { LessonEntityService } from "../services/lesson-entity.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  constructor(
    private coursesService: CourseEntityService,
    private lessonsService: LessonEntityService,
    private route: ActivatedRoute
  ) {}

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ["seqNo", "description", "duration"];

  nextPage = 0;

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.entities$.pipe(
      map((courses) => courses.find((course) => course.url == courseUrl))
    );

    this.lessons$ = of([]);
  }

  loadLessonsPage(course: Course) {}
}
