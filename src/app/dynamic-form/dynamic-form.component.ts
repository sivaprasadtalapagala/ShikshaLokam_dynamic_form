import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  @Input() formFields: any[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private employeeDataService: EmployeeDataService) {}

  ngOnInit(): void {
    const formGroup:any = {};

    this.formFields?.forEach(group => {
      group.fields.forEach((field:any) => {
        formGroup[field.name] = [
          field.type === 'date' ? null : '',
          field.validations?.isRequired ? Validators.required : null,
          field.type === 'text' ? Validators.pattern(field.validations.pattern) : null
        ].filter(v => v !== null);
      });
    });

    this.form = this.fb.group(formGroup);

    this.form.valueChanges.subscribe(data => {
      this.employeeDataService.setFormData(data);
    });
  }

  onSubmit(): void {
    console.log('Form Data:', this.form.value);
  }
}
