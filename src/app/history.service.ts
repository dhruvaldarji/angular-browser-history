import { Injectable } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { IRouteHistory, IRouteItem } from "./route-history.interface";

@Injectable()
export class HistoryService {
  private historyLimit = 50;
  private displayLimit = 10;

  private history$ = new BehaviorSubject<IRouteHistory[]>(
    this.getStorageHistory()
  );

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHistory();
      });
  }

  getHistory() {
    return this.history$.asObservable().pipe(
      map((history = []) => {
        return history
          .slice(-1 * this.displayLimit)
          .map(item => this.getRouteItem(item))
          .reverse();
      })
    );
  }

  clearHistory() {
    this.history$.next([]);
    this.setStorageHistory([]);
  }

  getRouteItem(item: IRouteHistory): IRouteItem {
    return {
      url: item.url,
      text: this.getNameFromUrl(item.url),
      description: item.date,
      icon: this.getIconFromUrl(item.url)
    };
  }

  private getNameFromUrl(url: string): string {
    return !url || url === "/" ? "Home" : `Page ${url.substr(1)}`;
  }

  private getIconFromUrl(url: string): string {
    return !url || url === "/" ? "home" : `file`;
  }

  private getStorageHistory(): IRouteHistory[] {
    return JSON.parse(localStorage.getItem("OneTrust.History") || null) || [];
  }

  private setStorageHistory(history: IRouteHistory[]) {
    localStorage.setItem("OneTrust.History", JSON.stringify(history || []));
  }

  private updateHistory() {
    let history = this.getStorageHistory();
    if (history.length > this.historyLimit) {
      history = history.slice(0, this.historyLimit);
    }
    if (history.length === this.historyLimit) {
      history = history.slice(1, this.historyLimit);
    }
    const url = this.getCurrentPath();
    const lastRoute = history.length ? history[history.length - 1] : null;
    const lastUrl = lastRoute ? lastRoute.url : "";
    if (url && (!lastUrl || url !== lastUrl)) {
      history.push({ url, date: new Date().toISOString() });
      this.setStorageHistory(history);
    }
    this.history$.next(history);
  }

  private getCurrentPath() {
    const href = this.getHref();
    const origin = this.getOrigin();
    const path = href.substr(origin.length);
    return path;
  }

  private getHref(): string {
    const location = this.getLocation();
    return location.href;
  }

  private getOrigin(): string {
    const location = this.getLocation();
    return location.origin || `${location.protocol}/${location.host}`;
  }

  private getLocation(): Location {
    return window.location;
  }
}
