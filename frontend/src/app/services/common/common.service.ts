import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private reloadComponentSource = new Subject<string>();

  reloadComponet$ = this.reloadComponentSource.asObservable();

  reloadComponent(coponentName: string){
    this.reloadComponentSource.next(coponentName);
  }
}