import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})

export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'g3ClhTqC0GkBh0teE6Ne0CqXUbTVmFBi';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){

    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !==tag ) //si el tag nuevo es diferente al tag antiguo los dejas pasar
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10); //se elimina si hay mas de diez elementos
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    // Se guarda el historial de busqueda en el localStorage como un array de string
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    // Se carga el historial existente dentro del localStorage. Puede ser nulo.
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // Se pone el operardo ! para decirle que nunca sera nulo.

    if(localStorage.length === 0)return; // sino hay historial no muestra nada
    this.searchTag(this._tagsHistory[0]); // si tiene historial, muestra los gifs de la posicion 0.
  }

  async searchTag(tag:string): Promise<void>{

    if(tag.length ===0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '8')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp=> {

        this.gifList = resp.data;
        console.log({gifs: this.gifList});

      });



    //console.log(this.tagsHistory);
  }
}
