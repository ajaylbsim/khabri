import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
@Injectable()
export class NodeService {
  private node: Subject<Object> = new BehaviorSubject<Object>({});
  node$ = this.node.asObservable();

  addNode(data: Object) {
    this.node.next(data);
  }
}
