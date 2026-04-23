import type { Page } from '@playwright/test';
import type { NavigablePage } from '../page-objects/interfaces/navigable-page';

import { ElementsPage } from '../page-objects/elements-page';
import { TextBoxPage } from '../page-objects/textbox-page';
import { CheckBoxPage } from '../page-objects/checkbox-page';
import { RadioButtonPage } from '../page-objects/radiobutton-page';
import { WebTablesPage } from '../page-objects/web-tables-page';
import { ButtonsPage } from '../page-objects/buttons-page';
import { LinksPage } from '../page-objects/links-page';
import { BrokenLinksImagesPage } from '../page-objects/broken-links-images-page';
import { UploadAndDownloadPage } from '../page-objects/upload-and-download-page';
import { DynamicPropertiesPage } from '../page-objects/dynamic-properties-page';

import { FormsPage } from '../page-objects/forms-page';
import { PracticeFormPage } from '../page-objects/practice-form-page';

import { AlertsWindowsPage } from '../page-objects/alerts-windows-page';
import { BrowserWindowsPage } from '../page-objects/browser-windows-page';
import { AlertsPage } from '../page-objects/alerts-page';
import { FramesPage } from '../page-objects/frames-page';
import { NestedFramesPage } from '../page-objects/nested-frames-page';
import { ModalDialogsPage } from '../page-objects/modal-dialogs-page';

import { WidgetsPage } from '../page-objects/widgets-page';
import { AccordianPage } from '../page-objects/accordian-page';
import { AutoCompletePage } from '../page-objects/auto-complete-page';
import { DatePickerPage } from '../page-objects/date-picker-page';
import { SliderPage } from '../page-objects/slider-page';
import { ProgressBarPage } from '../page-objects/progress-bar-page';
import { TabsPage } from '../page-objects/tabs-page';
import { ToolTipsPage } from '../page-objects/tool-tips-page';
import { MenuPage } from '../page-objects/menu-page';
import { SelectMenuPage } from '../page-objects/select-menu-page';

import { InteractionsPage } from '../page-objects/interactions-page';
import { SortablePage } from '../page-objects/sortable-page';
import { SelectablePage } from '../page-objects/selectable-page';
import { ResizablePage } from '../page-objects/resizable-page';
import { DroppablePage } from '../page-objects/droppable-page';
import { DragabblePage } from '../page-objects/dragabble-page';

import { BookstorePage } from '../page-objects/bookstore-page';
import { LoginPage } from '../page-objects/login-page';
import { ProfilePage } from '../page-objects/profile-page';
// import { BookstoreAPIPage } from '../page-objects/BookstoreAPIPage'; // Uncomment if implemented

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
    name: 'Elements',
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
    name: 'Forms',
    page: FormsPage,
    subPages: [
      { name: 'Practice Form', page: PracticeFormPage },
    ],
  },
  {
    name: 'Alerts, Frame & Windows',
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
    name: 'Widgets',
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
    name: 'Interactions',
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
    name: 'Book Store Application',
    page: BookstorePage,
    subPages: [
      { name: 'Login', page: LoginPage },
      { name: 'Book Store', page: BookstorePage },
      { name: 'Profile', page: ProfilePage },
      // { name: 'Book Store API', page: BookstoreAPIPage },
    ],
  },
];
