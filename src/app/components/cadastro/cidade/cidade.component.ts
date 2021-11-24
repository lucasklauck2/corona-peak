import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.scss'],
})
export class CidadeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [[''], [Validators.minLength(4)]],
      estado: [[''], [Validators.minLength(4)]],
      sigla: [[''], [Validators.minLength(2), Validators.maxLength(2)]],
    });
  }
}
