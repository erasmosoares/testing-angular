/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { UserDetailsComponent } from './user-details.component';

class RouterStub {

  navigate(params){
    //dummy
  }
}

class ActivatedRouteStub{
  
  private subject = new Subject(); //derives from observable

  push(value){
    this.subject.next(value);
  }

  get params(){
    return this.subject;
  }
  
}

// must user a fake router "stub"
describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers:[
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect the user to the users page after saving', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router,'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should redirect the user to the not found page when an invalid id is passed', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router,'navigate');

    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 0});

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
