import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/hero';  // URL to web api
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  //INFO Busca a lista de heroes do banco de dados.
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
                      .pipe(tap(_ => this.log(`fetched heroes`)), 
                            catchError(this.handleError<Hero[]>('getHeroes', [])));
    // this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  //INFO Busca o hero na base de dados com base no id informado.
  getHero(id: number): Observable<Hero> {
    // const hero = of (HEROES.find(hero => hero.id == id));
    const hero = this.http.get<Hero>(`${this.heroesUrl}/${id}`)
                    .pipe(tap(_ => this.log(`fetched hero id=${id}`)),
                          catchError(this.handleError<Hero>(`getHero id=$id`)));
    // this.messageService.add('HeroService: fetched heroes');
    return hero;
  }

  //INFO Altera o hero na base de dados com base no id informado.
  updateHero(hero: Hero): Observable<any> {
    console.log(this.heroesUrl+"/"+hero.id);
    debugger;
    return this.http.put(this.heroesUrl+"/"+hero.id, hero, this.httpOptions)
                    .pipe(tap(_ => this.log(`update hero id=${hero.id}`)),
                          catchError(this.handleError<any>(`updateHero`)));
  }

  //INFO Adiciona o hero na base de dados.
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions)
                    .pipe(tap((newHero: Hero) => this.log(`add hero w/ id=${newHero.id}`)),
                          catchError(this.handleError<Hero>(`addHero`)));
  }

  //INFO Deleta o hero da base de dados com base no id informado.
  delete(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id 
    
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
                    .pipe(tap(_ => this.log(`delete hero id=${id}`)),
                          catchError(this.handleError<Hero>('deleteHero')));
  }

  //INFO Exibe a mensagem no console log.
  private log(message:string) {
    //this.messageService.add(`HeroService\: ${message}`);
    console.log(`HeroService\: ${message}`);
  }

  //INFO Realiza a tratativa do erro,
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Exibe a mensagem de erro no console.
      console.error(error);
      //  Envia a mensagem para o método log exibir no console.
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //INFO Busca heroes com base nos caracteres digitados.
  search(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
                    .pipe(tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
                          catchError(this.handleError<Hero[]>('searchHeroes', [])));
  }
}
