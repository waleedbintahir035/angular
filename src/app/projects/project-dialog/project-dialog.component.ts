import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
})
export class ProjectDialogComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() project: any = null;

  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  projectForm!: FormGroup;
  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' }
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      setTimeout(() => {
        this.initForm();
        this.cdr.detectChanges();
      });
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: [this.project?.name || '', Validators.required],
      description: [this.project?.description || '', Validators.required],
      owner: [this.project?.owner || '', Validators.required],
      status: [this.project?.status || '', Validators.required]
    });
  }

  saveProject() {
    if (this.projectForm.valid) {
      this.onSave.emit(this.projectForm.value);
    }
  }

  closeDialog() {
    this.onClose.emit();
  }
}
