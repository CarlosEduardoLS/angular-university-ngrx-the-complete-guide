import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { Course } from "../model/course";
import { CourseEntityService } from "../services/courses-entity.service";
import { defaultDialogConfig } from "../shared/default-dialog-config";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private courseService: CourseEntityService
  ) {}

  @Input() courses: Course[];

  @Output() courseChanged = new EventEmitter();

  ngOnInit() {}

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Edit Course",
      course,
      mode: "update",
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    this.courseService.delete(course).subscribe(
      () => console.log("Delete completed"),
      (err) => console.log("Deleted failed", err)
    );
  }
}
