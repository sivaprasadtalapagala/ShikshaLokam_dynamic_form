import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  private formDataSubject = new BehaviorSubject<any>(null);
  formData$: Observable<any> = this.formDataSubject.asObservable();

  setFormData(formData: any): void {
    this.formDataSubject.next(formData);
  }
}
