import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false; //la imagen no se ha cargado la primera vez

  ngOnInit(): void {
    if( !this.url ) throw new Error ('URL property is required');
  }

  onLoad(){
    // Se pone un tiempo de espera de 1 s para que se aprecie el loader.
    setTimeout( () => {
      this.hasLoaded = true;
    }, 1000);

  }

}
