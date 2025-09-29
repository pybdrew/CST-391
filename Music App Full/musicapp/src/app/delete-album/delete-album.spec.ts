import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlbum } from './delete-album';

describe('DeleteAlbum', () => {
  let component: DeleteAlbum;
  let fixture: ComponentFixture<DeleteAlbum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAlbum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAlbum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
