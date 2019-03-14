import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {

  beforeEach(() => {
    let component: VoterComponent;
    let fixture: ComponentFixture<VoterComponent>;

    // dynamic testing module
    TestBed.configureTestingModule({
      declarations:[VoterComponent]
    });

    fixture = TestBed.createComponent(VoterComponent);    
    component = fixture.componentInstance;
    //fixture.natiElement
    //fixture.debugElement
  });

  it('', () => {
  });
});
