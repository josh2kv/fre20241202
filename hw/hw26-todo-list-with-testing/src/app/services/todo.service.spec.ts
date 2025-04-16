import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../interfaces/todo.model';
import { of } from 'rxjs';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  const mockTodos: Todo[] = [
    { userId: 1, title: 'New Item1', completed: false },
    { userId: 3, title: 'New Item2', completed: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get todos on getTodos', ()=>{
    spyOn(service, 'getTodos').and.returnValue(of(mockTodos));
    service.getTodos().subscribe((data)=>{
      expect(data.length).toBe(2);
      expect(data).toEqual(mockTodos);
    })
  })
});
