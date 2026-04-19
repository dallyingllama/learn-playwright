export type CheckboxTreeNode = {
  label: string;
  children?: CheckboxTreeNode[];
};

export type CheckboxSelectionScenario = {
  label: string;
  expandPath?: string[];
  expectedSelectedItems: string[];
  expectedCheckedNodes?: string[];
  expectedIndeterminateNodes?: string[];
};

export const checkboxTreeData: CheckboxTreeNode = {
  label: 'Home',
  children: [
    {
      label: 'Desktop',
      children: [
        { label: 'Notes' },
        { label: 'Commands' },
      ],
    },
    {
      label: 'Documents',
      children: [
        {
          label: 'WorkSpace',
          children: [
            { label: 'React' },
            { label: 'Angular' },
            { label: 'Veu' },
          ],
        },
        {
          label: 'Office',
          children: [
            { label: 'Public' },
            { label: 'Private' },
            { label: 'Classified' },
            { label: 'General' },
          ],
        },
      ],
    },
    {
      label: 'Downloads',
      children: [
        { label: 'Word File.doc' },
        { label: 'Excel File.doc' },
      ],
    },
  ],
};

export const checkboxSelectionScenarios: Record<'home' | 'general', CheckboxSelectionScenario> = {
  home: {
    label: 'Home',
    expectedSelectedItems: [
      'home',
      'desktop',
      'documents',
      'downloads',
      'notes',
      'commands',
      'workspace',
      'office',
      'wordFile',
      'excelFile',
      'react',
      'angular',
      'veu',
      'public',
      'private',
      'classified',
      'general',
    ],
    expectedCheckedNodes: [
      'Home',
      'Desktop',
      'Documents',
      'Downloads',
      'Notes',
      'Commands',
      'WorkSpace',
      'Office',
      'Word File.doc',
      'Excel File.doc',
      'React',
      'Angular',
      'Veu',
      'Public',
      'Private',
      'Classified',
      'General',
    ],
  },
  general: {
    label: 'General',
    expandPath: ['Home', 'Documents', 'Office'],
    expectedSelectedItems: ['general'],
    expectedCheckedNodes: ['General'],
    expectedIndeterminateNodes: ['Home', 'Documents', 'Office'],
  },
};
