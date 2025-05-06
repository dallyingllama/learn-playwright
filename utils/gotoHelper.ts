// utils/gotoHelper.ts

type GotoVariants = {
  (): Promise<void>;
  viaMenu: () => Promise<void>;
  viaDirectLink: () => Promise<void>;
};

export function createGotoWithVariants(
  viaMenuFn: () => Promise<void>,
  viaDirectLinkFn: () => Promise<void>
): GotoVariants {
  const randomGoto = async () => {
    const useMenu = Math.random() > 0.5;
    return useMenu ? goto.viaMenu() : goto.viaDirectLink();
  };

  const goto: GotoVariants = Object.assign(randomGoto, {
    viaMenu: viaMenuFn,
    viaDirectLink: viaDirectLinkFn
  });

  return goto;
}
