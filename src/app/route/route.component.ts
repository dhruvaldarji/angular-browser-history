import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {

  routes$ = this.getRoutes();


  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  /**
   * Get the current, previous, and next routes.
   */
  private getRoutes() {
    return this.route.params.pipe(map((params) => {
      const current = params && params['route']
        ? JSON.parse(params['route']) as number
        : 0;
      const previous = current ? current - 1 : 0;
      const next = current ? current + 1 : 1;
      const routes = {
        current,
        previous,
        next,
      };
      return routes;
    }));
  }

}