import MeanStack from '../models/meanstack';
import {Observable} from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import { map } from 'rxjs/operators';

@Injectable()
export class MeanstackService {

  api_url = 'http://localhost:3000';
  meanstackUrl = `${this.api_url}/api/meanstacks`;

  constructor(
    private http: HttpClient
  ) { }


  //Create meanstack, takes a MeanStack Object
  createMeanstack(meanstack: MeanStack): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.meanstackUrl}`, meanstack);
  }

  //Read meanstack, takes no arguments
  getMeanStacks(): Observable<MeanStack[]>{
    return this.http.get(this.meanstackUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as MeanStack[];
    }))
  }
  //Update meanstack, takes a MeanStack Object as parameter
  editMeanstack(meanstack:MeanStack){
    let editUrl = `${this.meanstackUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, meanstack);
  }

  deleteMeanstack(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.meanstackUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
