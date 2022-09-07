import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AppState } from "../../reducers";
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from "../courses.selectors";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { compareCourses, Course } from "../model/course";
import { CoursesHttpService } from "../services/courses-http.service";
import { defaultDialogConfig } from "../shared/default-dialog-config";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  promoTotal$: Observable<number>;

  loading$: Observable<boolean>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
