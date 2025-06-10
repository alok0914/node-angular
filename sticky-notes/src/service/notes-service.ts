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

  createNotes(notes: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/notes', notes);
  }

  updateNote(note: any): Observable<any> {
    return this.http.put('http://localhost:5000/api/notes/' + note._id, note)
  }

  deleteNote(note: any): Observable<any> {
    return this.http.delete('http://localhost:5000/api/notes/' + note._id, note);
  }
}
