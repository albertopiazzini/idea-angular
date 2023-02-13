import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  flush,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { CreateNewPostComponent } from './create-new-post.component';
import { Post } from '../model';
import { User } from "../model";

import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';
import { of } from 'rxjs';

describe('CreateNewPostComponent', () => {
  let component: CreateNewPostComponent;
  let fixture: ComponentFixture<CreateNewPostComponent>;
  let httpClient: HttpClient;
  let service: HttpServiceService;
  let httpClientSpy: { post: jasmine.Spy; put: jasmine.Spy };

  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewPostComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [HttpServiceService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewPostComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put']);

    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new HttpServiceService(httpClientSpy as any);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create a post', fakeAsync(() => {
    const testPost: Post = {
      title: 'title of testing post',
      body: 'body of testing post',
    };
       const user: User = {
      name: "name test",
      email: "test@test.it",
      gender: "male",
      id: 234,
      status: "active",
    };
    const testResponse = new HttpResponse({ body: testPost, status: 201 });
    spyOn(service, 'createNewPost').and.returnValue(of(testResponse));
    component.createNewPost();
    flush();
    expect(201).toEqual(testResponse.status);
  }));

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    const testPost: Post = {
      title: 'title of testing post',
      body: 'body of testing post',
      user_id: 7454,
    };

    httpClient
      .post<Post>(`${environment.userLink}/7454/posts`, testPost)
      .subscribe({
        next: () => fail('should have failed with the 404 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(emsg);
        },
      });

    const req = httpTestingController.expectOne(
      `${environment.userLink}/7454/posts`
    );

    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
