import {BasePage} from './basePage';
import { Page } from '@playwright/test';
export default class ArticlePage extends BasePage {

  constructor(page : page) {
    super(page);
  }
}