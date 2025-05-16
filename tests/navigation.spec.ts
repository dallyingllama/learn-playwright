// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { SidebarMenu } from '../pageObjects/components/SidebarMenu';
import { ElementsPage } from '../pageObjects/ElementsPage';
import { TextBoxPage } from '../pageObjects/TextBoxPage';
import { CheckBoxPage } from '../pageObjects/CheckBoxPage';
import { RadioButtonPage } from '../pageObjects/RadioButtonPage';
import { WebTablesPage } from '../pageObjects/WebTablesPage';
import { ButtonsPage } from '../pageObjects/ButtonsPage';
import { LinksPage } from '../pageObjects/LinksPage';
import { BrokenLinksImagesPage } from '../pageObjects/BrokenLinksImagesPage';
import { UploadAndDownloadPage } from '../pageObjects/UploadAndDownloadPage';
import { DynamicPropertiesPage } from '../pageObjects/DynamicPropertiesPage';
import { FormsPage } from '../pageObjects/FormsPage';
import { PracticeFormPage } from '../pageObjects/PracticeFormPage';
import { AlertsWindowsPage } from '../pageObjects/AlertsFrameWindowsPage';
import { BrowserWindowsPage } from '../pageObjects/BrowserWindowsPage';
import { AlertsPage } from '../pageObjects/AlertsPage';
import { FramesPage } from '../pageObjects/FramesPage';
import { NestedFramesPage } from '../pageObjects/NestedFramesPage';
import { ModalDialogsPage } from '../pageObjects/ModalDialogsPage';
import { AccordianPage } from '../pageObjects/AccordianPage';
import { WidgetsPage } from '../pageObjects/WidgetsPage';
import { AutoCompletePage } from '../pageObjects/AutoCompletePage';
import { DatePickerPage } from '../pageObjects/DatePickerPage';
import { SliderPage } from '../pageObjects/SliderPage';
import { ProgressBarPage } from '../pageObjects/ProgressBarPage';
import { TabsPage } from '../pageObjects/TabsPage';
import { ToolTipsPage } from '../pageObjects/ToolTipsPage';
import { MenuPage } from '../pageObjects/MenuPage';
import { SelectMenuPage } from '../pageObjects/SelectMenuPage';
import { InteractionsPage } from '../pageObjects/InteractionsPage';
import { SortablePage } from '../pageObjects/SortablePage';
import { SelectablePage } from '../pageObjects/SelectablePage';
import { ResizablePage } from '../pageObjects/ResizablePage';
import { DroppablePage } from '../pageObjects/DroppablePage';
import { DragablePage } from '../pageObjects/DragablePage';
import { BookstorePage } from '../pageObjects/BookstorePage';
import { LoginPage } from '../pageObjects/LoginPage';
import { ProfilePage } from '../pageObjects/ProfilePage';

const sections = [
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
      { name: 'Dragabble', page: DragablePage },
    ],
  },
  {
    name: 'Book Store Application',
    page: BookstorePage,
    subPages: [
      { name: 'Login', page: LoginPage },
      { name: 'Book Store', page: BookstorePage },
      { name: 'Profile', page: ProfilePage },
//      { name: 'Book Store API', page: BookstoreAPIPage },

    ],
  },
];

// Create test for each navigation strategy
const strategies = [
  { name: 'via menu', method: 'viaMenu' as const },
  { name: 'via direct link', method: 'viaDirectLink' as const },
];

for (const strategy of strategies) {
  test.describe(`📚✅ Home Page -> Menu Item -> SubItem (${strategy.name})`, { tag: '@sanity' }, () => {
    for (const section of sections) {
      test.describe(`${section.name}`, () => {
        for (const subPage of section.subPages) {
          test(`➡️ Navigate to ${subPage.name}`, async ({ page }) => {
            const subPageInstance = new (subPage.page ?? section.page)(page);
            await subPageInstance.goto[strategy.method]();
            await subPageInstance.assertOnPage();
          });
        }
      });
    }
  });
}