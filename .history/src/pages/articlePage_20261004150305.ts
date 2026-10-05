import {BasePage} from './basePage';
import { Page,Locator } from '@playwright/test';
export default class ArticlePage extends BasePage {

  constructor(page : Page) {
    super(page);
  }
}