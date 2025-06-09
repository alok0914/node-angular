import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../service/notes-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-component',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './notes-component.html',
  styleUrl: './notes-component.scss',
})
export class NotesComponent implements OnInit {
  allNotes: Array<{ name: ''; content: ''; }> = [];
  constructor(private notesSrc: NotesService) {   }
  ngOnInit(): void {
    this.getNotes();
  }


  noteForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  getNotes() {
    this.notesSrc.getNotes().subscribe(notes => {
      this.allNotes = notes?.notes;
       console.log('allnotes === ', this.allNotes);
    });
  }

  submitNote() {
    this.notesSrc.createNotes(this.noteForm.value);
  }
}
