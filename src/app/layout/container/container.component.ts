import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1280px)');
    this._mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  sidebarStatus = false;

  ngOnInit() {

  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
