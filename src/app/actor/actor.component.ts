import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
//import { Router } from "@angular/router";
@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  //movies
  moviesDB: any[] = [];
  mName: string = "";
  aYear: number = 0;
  movieId: string = "";
  movie: {};


  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //add a new movie, POST request
  onSaveMovie() {
    let obj = { title: this.mName, year: this.aYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  //movies task
  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies(); //movie task
  }
  
  //end

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";

    this.mName = "";
    this.aYear = 0;
    this.movieId = "";
  }

  onSelectActForMod(item){
    this.fullName = item.name;
    this.actorId = item._id;
  }
  onSelectMovForMod(item){
    this.mName = item.title;
    this.movieId = item._id;
    
    this.movie = { id: this.movieId }
  }

  onAddMovie(){
    let obj = {id: this.movieId};
    this.dbService.addMovietoActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
      this.resetValues();
    });
  }

  deleteMovieLte() {
    this.dbService.deleteMovieByYear(this.aYear).subscribe(result => {
      this.onGetMovies();
    });
  }
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-actor',
//   templateUrl: './actor.component.html',
//   styleUrls: ['./actor.component.css']
// })
// export class ActorComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
