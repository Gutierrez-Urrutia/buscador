import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all search results', (done) =>{
    const mockResponse = [
      { name: "Trinidad Cornejo"},
      { name: "Matías Herrera"},
    ];

    service.getAll().subscribe((people: any) => {
      expect(people.length.toBe(2));
      expect(people[0].name).toBe("Trinidad Cornejo");
      expect(people).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

  });

  it('should filter by search term', (done) =>{
    const mockResponse = [{ name: "Trinidad Cornejo"}];

    service.search('trini').subscribe((people: any) => {
      expect(people.length.toBe(1));
      expect(people[0].name).toBe("Trinidad Cornejo");
      done();
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch by id', (done: DoneFn) => {
    const mockResponse = [
      { name: "Trinidad Cornejo"},
      { name: "Matías Herrera"},
    ];

    service.get(2).subscribe((person: any) => {
      expect(person.name).toBe('Matías Herrera');
      done();
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });




  afterEach(() => {
    httpMock.verify();
  })
});
