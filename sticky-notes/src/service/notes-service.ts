import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NotesService {
  

  constructor(private http: HttpClient) {
   
   }

  getNotes(): Observable<any> {
    return this.http.get('http://localhost:5000/api/notes');
  }

  createNotes(notes: any) {
    console.log('notes', notes);
    this.http.post('http://localhost:5000/api/notes', notes).subscribe((res) => {
      console.log('res', res);
    });
  }
}
