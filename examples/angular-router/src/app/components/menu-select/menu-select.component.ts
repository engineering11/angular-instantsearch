import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { BaseWidget, NgAisInstance } from "angular-instantsearch";
import { connectMenu } from "instantsearch.js/es/connectors";

@Component({
  selector: "ng-ais-menu-select",
  template: `
    <select
      class="menu-select"
      (change)="state.refine($event.target.value)"
    >
      <option
        *ngFor="let item of state.items"
        [value]="item.value"
        [selected]="item.isRefined"
      >
        {{item.label}}
      </option>
    </select>
  `
})
export class MenuSelect extends BaseWidget {
  state: {
    items: { label: string; value: string }[];
    createURL: () => string;
    refine: (value: string) => void;
    canRefine: boolean;
    isShowingMore: boolean;
    toggleShowMore: () => void;
    canToggleShowMore: boolean;
  };

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "MenuSelect");
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attributeName: "materials" });
    super.ngOnInit();
  }
}