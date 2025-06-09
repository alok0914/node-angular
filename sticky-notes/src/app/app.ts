import { Component } from '@angular/core';
import { NotesComponent } from './notes-component/notes-component';

@Component({
  selector: 'app-root',
  imports: [NotesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }
