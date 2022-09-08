import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { concatMap, delay, map, tap, withLatestFrom } from "rxjs/operators";
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

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ["seqNo", "description", "duration"];

  nextPage = 0;

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.entities$.pipe(
      map((courses) => courses.find((course) => course.url == courseUrl))
    );

    this.lessons$ = this.lessonsService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lessons, course]) => {
        if (this.nextPage === 0) this.loadLessonsPage(course);
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId === course.id)
      )
    );

    this.loading$ = this.lessonsService.loading$.pipe(delay(0));
  }

  loadLessonsPage(course: Course) {
    this.lessonsService.getWithQuery({
      courseId: course.id.toString(),
      pageNumber: this.nextPage.toString(),
      pageSize: "3",
    });

    this.nextPage += 1;
  }
}
