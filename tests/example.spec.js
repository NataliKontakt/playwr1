
const { test, expect } = require('@playwright/test');
import {nameUser, passwordUser, invalidNameUser, invalidPasswordUser} from '../user/user';



test('Login with valid data', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in',{timeout:120000});
  await page.screenshot({ path: 'screenshots/screenshot.png' });
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(nameUser);
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Пароль').fill(passwordUser);
  await page.getByTestId('login-submit-btn').click();
  const title = page.locator('h2');
  await expect(title).toHaveText('Мои курсы и профессии');
  await page.screenshot({ path: 'screenshots/screenshot1.png'});
});

test.only('Login with invalid data', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in',{timeout:120000});
  await page.screenshot({ path: 'screenshots/screenshot2.png' });
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill("t@yandex.ru");
  //await page.getByPlaceholder('Email').fill(invalidNameUser);
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Пароль').fill("77777777");
  //await page.getByPlaceholder('Пароль').fill(invalidPasswordUser);
  await page.getByTestId('login-submit-btn').click();
  const title = page.getByTestId('login-error-hint');
  await expect(title).toHaveText('Вы ввели неправильно логин или пароль');
  await page.screenshot({ path: 'screenshots/screenshot3.png'});
});
