import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {SearchService} from "../shared";
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue:{
            snapshot: {
              params: { term: 'trinidad'}
            }
          }
        }
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ]}).compileComponents();
  });

  beforeEach(() => {
    mockSearchService = TestBed.inject(SearchService);
    mockSearchService.search = jasmine.createSpy('search').and.returnValue(of([]));

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when a term is set and search() is called', ()=>{
    component = fixture.componentInstance;
    component.query = 'T';
    component.search();
    expect(mockSearchService.search).toHaveBeenCalledWith('T');
  });

  it('should search automatically when a term is on the URL', () =>{
    fixture.detectChanges();
    expect(mockSearchService.search).toHaveBeenCalledWith('trinidad');
  });
});
