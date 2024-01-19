import { Component } from '@angular/core';
import { EmployeeDataService } from './employee-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jsonData = {
    "title": "Employee data",
    "formFields": [
      {
        "label": "Personal Information",
        "fields": [
          {
            "type": "text",
            "label": "First Name",
            "name": "first_name",
            "placeholder": "Enter your first name",
            "validations": {
              "isRequired": true,
              "pattern": "^[A-Za-z'-]+$"
            }
          },
          {
            "type": "text",
            "label": "Last Name",
            "name": "last_name",
            "placeholder": "Enter your last name",
            "validations": {
              "isRequired": true,
              "pattern": "^[A-Za-z'-]+$"
            }
          },
          {
            "type": "date",
            "label": "Date of Birth",
            "name": "dob",
            "validations": {
              "isRequired": true
            }
          },
          {
            "type": "radio",
            "label": "Gender",
            "name": "gender",
            "options": [
              { "label": "Male", "value": "male" },
              { "label": "Female", "value": "female" },
              { "label": "Other", "value": "other" }
            ],
            "validations": {
              "isRequired": true
            }
          }
        ]
      },
      {
        "label": "General Information",
        "fields": [
          {
            "type": "checkbox",
            "label": "Interests",
            "name": "interests",
            "options": [
              { "label": "Reading", "value": "reading" },
              { "label": "Sports", "value": "sports" },
              { "label": "Cooking", "value": "cooking" }
            ]
          },
          {
            "type": "select",
            "label": "State",
            "name": "state",
            "options": [
              { "label": "Karnataka", "value": "karnataka" },
              { "label": "Maharastra", "value": "maharastra" },
              { "label": "Kerala", "value": "kerala" }
            ],
            "validations": {
              "isRequired": false
            }
          }
        ]
      },
      {
        "label": "Company Information",
        "fields": [
          {
            "type": "select",
            "label": "Skills",
            "name": "skill",
            "options": [
              { "label": "Angular", "value": "angular" },
              { "label": "Nodejs", "value": "nodejs" },
              { "label": "Flutter", "value": "flutter" }
            ],
            "validations": {
              "isRequired": true
            }
          },
          {
            "type": "date",
            "label": "Date of Joining",
            "name": "doj",
            "validations": {
              "isRequired": true
            }
          }
        ]
      }
    ]
  }
  formFields = this.jsonData.formFields; 

  constructor(private employeeDataService: EmployeeDataService) {}

  onFormSubmit(formData: any): void {
    console.log('Form Data:', formData);
  }
}
