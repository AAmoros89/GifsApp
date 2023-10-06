import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  ><!-- se hace una referencia local al poner txtTagInput sobre el input que se va a escribir que solo afecta al template-->
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput') // se hace referencia local al input "txtTagInput"
  public tagInput!: ElementRef<HTMLInputElement>;// se pone un ! para decirle que siempre va a tener un valor y no puede ser nulo

  constructor(private gifsService: GifsService){ }

  searchTag( ) {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
