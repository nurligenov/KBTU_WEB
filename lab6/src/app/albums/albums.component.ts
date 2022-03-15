import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})


export class AlbumsComponent implements OnInit {
  albums: Album[] = []
  newAlbum: Album = {
    id: null,
    title: null,
    userId: null
  }
  constructor(private albumService: AlbumsService, private router: Router) {}

  ngOnInit(): void {
    this.getAlbums()
  }
  getAlbums(): void {
    this.albums = this.albumService.albums;
    console.log(this.albums);
  

  }

  remove(id: number | null){
    if (!id){
      return
    }
    this.albumService.remove(id);
    this.getAlbums()
    window.alert('Product succesfully removed')
   }

  create(){
    this.albumService.createAlbum(this.newAlbum);
    this.getAlbums()
  }

}

export interface Album{
  id: number | null
  userId: number | null
  title: string | null
}