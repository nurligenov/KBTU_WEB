import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Album } from './albums/albums.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  public albums: Album[] = [];
  constructor(private http: HttpClient) {
    if (!localStorage.getItem('albums')){
      this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums').subscribe(response => {
        this.albums = response
          localStorage.setItem('albums', JSON.stringify(response));
      }
      )
    }
    this.albums = JSON.parse(localStorage.getItem('albums') || '');
    
   }
  createAlbum(album: Album) {
    this.albums.push(album)
    this.updateStorage()
  }
   updateStorage(){
    localStorage.setItem('albums', JSON.stringify(this.albums));
  }

  remove(id: number){
    this.albums = this.albums.filter(album => album.id != id);
    this.updateStorage()
  }

}


