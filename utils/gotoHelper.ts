// utils/gotoHelper.ts

export type GotoMethod = 'viaMenu' | 'viaDirectLink';

type CreateGotoOptions = {
  defaultMethod?: GotoMethod;
};

export type GotoVariants = {
  (): Promise<void>;
  viaMenu: () => Promise<void>;
  viaDirectLink: () => Promise<void>;
  random: () => Promise<void>;
};

export function createGotoWithVariants(
  viaMenuFn: () => Promise<void>,
  viaDirectLinkFn: () => Promise<void>,
  options: CreateGotoOptions = {}
): GotoVariants {
  const defaultMethod = options.defaultMethod ?? 'viaDirectLink';

  const goto: GotoVariants = Object.assign(
    async () => goto[defaultMethod](),
    {
      viaMenu: viaMenuFn,
      viaDirectLink: viaDirectLinkFn,
      random: async () => {
        const useMenu = Math.random() > 0.5;
        return useMenu ? goto.viaMenu() : goto.viaDirectLink();
      }
    }
  );

  return goto;
}
