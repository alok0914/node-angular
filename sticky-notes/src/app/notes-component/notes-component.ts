import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../service/notes-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './notes-component.html',
  styleUrl: './notes-component.scss',
})
export class NotesComponent implements OnInit, OnChanges {
  allNotes: Array<{ _id: ''; name: ''; content: ''; }> = [];
  constructor(private notesSrc: NotesService, private changeDetection: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getNotes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('sdjcbjkscsdc', this.allNotes, changes)
  }


  noteForm = new FormGroup({
    name: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  getNotes() {
    this.notesSrc.getNotes().subscribe(notes => {
      this.allNotes = notes?.notes;
    });
  }

  submitNote() {
    this.notesSrc.createNotes(this.noteForm.value).subscribe((newItem: any) => {
      console.log('before==', this.allNotes)
      this.allNotes = [...this.allNotes, newItem];
      console.log('after==', this.allNotes);
      this.changeDetection.detectChanges()
    });;
  }

  trackByFn(index: number, item: any): any {
      return item._id;
    }

  editNote(data: {}) {
    this.notesSrc.updateNote(data);
  }

  deleteNote(data: any) {
    this.notesSrc.deleteNote(data).subscribe(()=> {
      this.allNotes = this.allNotes.filter(note => note?._id !== data?._id);
    });
  }
}
