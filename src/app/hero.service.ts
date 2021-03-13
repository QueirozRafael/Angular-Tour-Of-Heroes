import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
                      .pipe(tap(_ => this.log(`fetched heroes`)), 
                            catchError(this.handleError<Hero[]>('getHeroes', [])));
    // this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // const hero = of (HEROES.find(hero => hero.id == id));
    const hero = this.http.get<Hero>(`${this.heroesUrl}/${id}`)
                    .pipe(tap(_ => this.log(`fetched hero id=${id}`)),
                          catchError(this.handleError<Hero>(`getHero id=$id`)));
    // this.messageService.add('HeroService: fetched heroes');
    return hero;
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
                    .pipe(tap(_ => this.log(`update hero id=${hero.id}`)),
                          catchError(this.handleError<any>(`updateHero`)));
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions)
                    .pipe(tap((newHero: Hero) => this.log(`add hero w/ id=${newHero.id}`)),
                          catchError(this.handleError<Hero>(`addHero`)));
  }

  delete(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id 
    
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
                    .pipe(tap(_ => this.log(`delete hero id=${id}`)),
                          catchError(this.handleError<Hero>('deleteHero')));
  }

  private log(message:string) {
    //this.messageService.add(`HeroService\: ${message}`);
    console.log(`HeroService\: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
