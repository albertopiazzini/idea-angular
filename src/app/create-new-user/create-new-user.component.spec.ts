import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { User } from '../model';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";


import { CreateNewUserComponent } from './create-new-user.component';

describe('CreateNewUserComponent', () => {
  let component: CreateNewUserComponent;
  let fixture: ComponentFixture<CreateNewUserComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewUserComponent],
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewUserComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can test Httpclient.post', () => {
    const userTest: User = {
      name: 'name test',
      email: 'mail test',
      gender: 'male',
      status: 'active',
    };
    httpClient
      .post<User>(`${environment.userLink}`, userTest)
      .subscribe((data) => {
        expect(data).toEqual(userTest);
      });
    const req = httpTestingController.expectOne(`${environment.userLink}`);
    expect(req.request.method).toEqual('POST');
    req.flush(userTest);

    httpTestingController.verify();
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    const userTest: User = {
      name: 'name test',
      email: 'mail test',
      gender: 'male',
      status: 'active',
    };

    httpClient.post<User>(`${environment.userLink}`, userTest).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      },
    });

    const req = httpTestingController.expectOne(`${environment.userLink}`);

    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
