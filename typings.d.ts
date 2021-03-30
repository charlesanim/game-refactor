// Custom typings to enable NgOnchanges to process change events in inputs

declare type ComponentChanges<
  TComponent
> = import('@angular/core').SimpleChanges &
  {
    [P in keyof TComponent]?: ComponentChange<TComponent[P]>;
  };

declare interface ComponentChange<TChange> {
  previousValue: TChange;
  currentValue: TChange;
  firstChange: boolean;
}
