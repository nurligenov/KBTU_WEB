import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from '../albums.service';
import { Album } from '../albums/albums.component';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albums: Album[] = []
  constructor(private route: ActivatedRoute, private albumService: AlbumsService, private router: Router) { 
    this.albums = this.albumService.albums;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       console.log(params)
       const id = params['album_id'];
       this.albums = this.albums.filter(album => album.id==id);
     });
   }

   return(){
    this.router.navigateByUrl('/albums');
   }

  //  update(){
  //   this.albumService.update(id);
  //  }

}
