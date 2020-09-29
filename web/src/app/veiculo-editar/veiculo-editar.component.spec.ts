import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoEditarComponent } from './veiculo-editar.component';

describe('VeiculoEditarComponent', () => {
  let component: VeiculoEditarComponent;
  let fixture: ComponentFixture<VeiculoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
