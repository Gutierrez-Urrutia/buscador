import { Component } from '@angular/core';
import {Person, SearchService} from "../shared";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  person!: Person;
  sub!: Subscription;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private service: SearchService){}

  async ngOnInit(): Promise<void> {
    const params = this.route.snapshot.params;
    const id = +params['id'];
    this.sub = this.service.get(id).subscribe(person =>{
      if(person){
        this.person = person;
      } else {
        this.goToList();
      }
    })
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  async cancel(): Promise<void> {
    await this.router.navigate(['/search']);
  }

  async save(): Promise<void> {
    this.service.save(this.person);
    await this.goToList();
  }

  async goToList(): Promise<void> {
    if (this.person){
      await this.router.navigate(['/search', { term: this.person.name }]);
    } else {
      await this.router.navigate(['/search']);
    }
  }
}
