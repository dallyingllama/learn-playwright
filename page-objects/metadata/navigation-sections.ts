import type { Page } from '@playwright/test';
import type { NavigablePage } from '../interfaces/navigable-page';

import { ElementsPage } from '../elements-page';
import { TextBoxPage } from '../textbox-page';
import { CheckBoxPage } from '../checkbox-page';
import { RadioButtonPage } from '../radiobutton-page';
import { WebTablesPage } from '../web-tables-page';
import { ButtonsPage } from '../buttons-page';
import { LinksPage } from '../links-page';
import { BrokenLinksImagesPage } from '../broken-links-images-page';
import { UploadAndDownloadPage } from '../upload-and-download-page';
import { DynamicPropertiesPage } from '../dynamic-properties-page';

import { FormsPage } from '../forms-page';
import { PracticeFormPage } from '../practice-form-page';

import { AlertsWindowsPage } from '../alerts-windows-page';
import { BrowserWindowsPage } from '../browser-windows-page';
import { AlertsPage } from '../alerts-page';
import { FramesPage } from '../frames-page';
import { NestedFramesPage } from '../nested-frames-page';
import { ModalDialogsPage } from '../modal-dialogs-page';

import { WidgetsPage } from '../widgets-page';
import { AccordianPage } from '../accordian-page';
import { AutoCompletePage } from '../auto-complete-page';
import { DatePickerPage } from '../date-picker-page';
import { SliderPage } from '../slider-page';
import { ProgressBarPage } from '../progress-bar-page';
import { TabsPage } from '../tabs-page';
import { ToolTipsPage } from '../tool-tips-page';
import { MenuPage } from '../menu-page';
import { SelectMenuPage } from '../select-menu-page';

import { InteractionsPage } from '../interactions-page';
import { SortablePage } from '../sortable-page';
import { SelectablePage } from '../selectable-page';
import { ResizablePage } from '../resizable-page';
import { DroppablePage } from '../droppable-page';
import { DragabblePage } from '../dragabble-page';

import { BookstorePage } from '../bookstore-page';
import { LoginPage } from '../login-page';
import { ProfilePage } from '../profile-page';
// import { BookstoreAPIPage } from '../BookstoreAPIPage'; // Uncomment if implemented
import { sectionMetadata } from './section-metadata';

export type NavigationPageObject = NavigablePage & {
  assertOnPage: () => Promise<void>;
};

export type NavigationPageObjectClass = new (page: Page) => NavigationPageObject;

export type NavigationSubPage = {
  name: string;
  page?: NavigationPageObjectClass;
};

export type NavigationSection = {
  name: string;
  page: NavigationPageObjectClass;
  subPages: NavigationSubPage[];
};

export const sections: NavigationSection[] = [
  {
    name: sectionMetadata.elements.name,
    page: ElementsPage,
    subPages: [
      { name: 'Text Box', page: TextBoxPage },
      { name: 'Check Box', page: CheckBoxPage },
      { name: 'Radio Button', page: RadioButtonPage },
      { name: 'Web Tables', page: WebTablesPage },
      { name: 'Buttons', page: ButtonsPage },
      { name: 'Links', page: LinksPage },
      { name: 'Broken Links - Images', page: BrokenLinksImagesPage },
      { name: 'Upload and Download', page: UploadAndDownloadPage },
      { name: 'Dynamic Properties', page: DynamicPropertiesPage },
    ],
  },
  {
    name: sectionMetadata.forms.name,
    page: FormsPage,
    subPages: [{ name: 'Practice Form', page: PracticeFormPage }],
  },
  {
    name: sectionMetadata.alertsWindows.name,
    page: AlertsWindowsPage,
    subPages: [
      { name: 'Browser Windows', page: BrowserWindowsPage },
      { name: 'Alerts', page: AlertsPage },
      { name: 'Frames', page: FramesPage },
      { name: 'Nested Frames', page: NestedFramesPage },
      { name: 'Modal Dialogs', page: ModalDialogsPage },
    ],
  },
  {
    name: sectionMetadata.widgets.name,
    page: WidgetsPage,
    subPages: [
      { name: 'Accordian', page: AccordianPage },
      { name: 'Auto Complete', page: AutoCompletePage },
      { name: 'Date Picker', page: DatePickerPage },
      { name: 'Slider', page: SliderPage },
      { name: 'Progress Bar', page: ProgressBarPage },
      { name: 'Tabs', page: TabsPage },
      { name: 'Tool Tips', page: ToolTipsPage },
      { name: 'Menu', page: MenuPage },
      { name: 'Select Menu', page: SelectMenuPage },
    ],
  },
  {
    name: sectionMetadata.interactions.name,
    page: InteractionsPage,
    subPages: [
      { name: 'Sortable', page: SortablePage },
      { name: 'Selectable', page: SelectablePage },
      { name: 'Resizable', page: ResizablePage },
      { name: 'Droppable', page: DroppablePage },
      { name: 'Dragabble', page: DragabblePage },
    ],
  },
  {
    name: sectionMetadata.bookStoreApplication.name,
    page: BookstorePage,
    subPages: [
      { name: 'Login', page: LoginPage },
      { name: 'Book Store', page: BookstorePage },
      { name: 'Profile', page: ProfilePage },
      // { name: 'Book Store API', page: BookstoreAPIPage },
    ],
  },
];
