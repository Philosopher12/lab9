import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }

  //movie task
  getMovies() {
    return this.http.get("/movies");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  //movie task
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }

  //movie task
  createMovie(data) {
    return this.http.post("/movies", data, httpOptions);
  }


  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  //delete movies
  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  //add movie to actor
  addMovietoActor(actor, movie){
    return this.http.post("/actors/" + actor + "/movies", movie ,httpOptions);
  }

  deleteMovieByYear(year) {
    let url = "/movies/year/"+year
    return this.http.delete(url, httpOptions);
}

}
