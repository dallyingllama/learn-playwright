// pageObjects/interfaces/NavigablePage.ts
import type { GotoVariants } from '../../utils/gotoHelper';

export interface NavigablePage {
  goto: GotoVariants;
}
