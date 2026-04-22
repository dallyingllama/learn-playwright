// page-objects/interfaces/navigable-page.ts
import type { GotoVariants } from '../../utils/gotoHelper';

export interface NavigablePage {
  goto: GotoVariants;
}
