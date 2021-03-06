import { Component, OnInit, OnChanges } from '@angular/core';
import { VocabularyService } from 'src/app/service/vocabulary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vocabulary } from 'src/models/Vocabulary';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formcheck;
  newEN = '';
  newVN = '';
  showForm = false;
  showErrEN: boolean;
  showErrVN: boolean;
  countEN = 0;
  countVN = 0;

  newID = this.vocabularyService.vocabularies[(this.vocabularyService.vocabularies.length) - 1].id + 1;

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit() {
    this.showErrEN = false;
    this.showErrVN = false;
    this.formcheck = new FormGroup({
      'en': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      'vn': new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*')
      ])
    });
  }

  EN() {
    return this.formcheck.get('en');
  }
  VN() { return this.formcheck.get('vn'); }

  addNew() {
    const Obj: Vocabulary = {
      id: this.newID,
      en: this.newEN,
      vn: this.newVN,
      memorized: false
    };

    if ((!this.EN().errors) && (!this.VN().errors)) {
      this.vocabularyService.add(Obj);
      this.EN().setValue('');
      this.VN().setValue('');
      this.showForm = false;
    }
  }

  function_changeEN() {
    this.countEN++;
    if (this.newEN === '' && this.countEN > 1) {
      this.showErrEN = true;
    }
  }

  function_changeVN() {
    this.countVN++;
    if (this.newVN === '' && this.countVN > 1) {
      this.showErrVN = true;
    }
  }
}
