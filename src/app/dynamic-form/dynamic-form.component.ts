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
  fieldErrors: { [key: string]: string } = {};

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
      this.updateFieldErrors();
    });
  }

  onSubmit(): void {
    console.log('Form Data:', this.form.value);
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.updateFieldErrors();
    }
  }


  updateFieldErrors(): void {
    this.fieldErrors = {};
  
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
  
      if (control && control.invalid && (control.dirty || control.touched)) {
        const errors = control.errors;
  
        if (errors?.['required']) {
          this.fieldErrors[key] = 'This field is required';
        } else if (errors?.['pattern']) {
          this.fieldErrors[key] = 'Invalid input';
        }
      }
    });
  }
  

  showError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    const errors = control?.errors as { [key: string]: boolean };

    if (errors?.['required']) {
      return 'This field is required';
    } else if (errors?.['pattern']) {
      return 'Invalid input';
    }

    return '';
  }
}
