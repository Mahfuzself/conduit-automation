import {BasePage} from './basePage';
import { Page,Locator } from '@playwright/test';
export class ArticlePage extends BasePage {

  constructor(page : Page) {
    super(page);
  }
}