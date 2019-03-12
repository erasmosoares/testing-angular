import { Observable } from 'rxjs/Observable';
import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [
      {id:1, title: 'a'},
      {id:2, title: 'b'},
      {id:3, title: 'C'},
    ]
    spyOn(service,'getTodos').and.callFake(()=>{
      return Observable.from([todos])
    }); 

    component.ngOnInit();

    expect(component.todos).toBe(todos)
  });

  it('this component should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service,'add').and.callFake(t => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();

  });

  it('this component should add a new todo returned from the server', () => {
    
    let todo = {id: 1};
    
    let spy = spyOn(service,'add').and.returnValue(Observable.from([todo]));
    
    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);

  });

  it('set the message property fi server returns an error when adding a new todo', () => {
    
    let error = "Error from the server";
    let spy = spyOn(service,'add').and.returnValue(Observable.throw(error));
    
    component.add();

    expect(component.message).toBe(error);

  });
  
});