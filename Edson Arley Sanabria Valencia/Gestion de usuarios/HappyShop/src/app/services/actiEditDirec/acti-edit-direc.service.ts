import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiEditDirecService {

  constructor() { }

  $modal = new EventEmitter<any>();
}
