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
  isEditMode: boolean = false;
  editData: Array<{ _id: ''; name: ''; content: ''; }> = [];
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
    if (this.isEditMode) {
      this.notesSrc.updateNote(this.editData).subscribe((editData: any) => {
        console.log('editData', editData)
        // this.allNotes = this.allNotes.filter(note => note?._id !== data?._id);
        // this.changeDetection.markForCheck();
        this.noteForm.reset();
      });;;
    } else {
      this.notesSrc.createNotes(this.noteForm.value).subscribe((newItem: any) => {
        this.allNotes = [...this.allNotes, newItem];
        this.changeDetection.markForCheck();
        this.noteForm.reset();
      });
    }

  }

  editNote(data: any) {
    this.isEditMode = true;
    this.editData = data;
    this.noteForm.patchValue({ name: data.name, content: data.content });
  }

  deleteNote(data: any) {
    this.notesSrc.deleteNote(data).subscribe(() => {
      this.allNotes = this.allNotes.filter(note => note?._id !== data?._id);
      this.changeDetection.markForCheck();
    });
  }
}
