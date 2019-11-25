import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarComponent } from './cadastrar-editar.component';

describe('CadastrarEditarComponent', () => {
  let component: CadastrarEditarComponent;
  let fixture: ComponentFixture<CadastrarEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
