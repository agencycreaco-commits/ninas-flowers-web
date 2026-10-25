import { expect, test } from '@playwright/test'

test('el inicio muestra la marca, el catálogo y el botón de WhatsApp', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText("Nina's")
  await expect(page.locator('.fab')).toHaveAttribute('href', /wa\.me\/573143009277/)
  await page.getByRole('link', { name: 'Ver catálogo' }).first().click()
  await expect(page).toHaveURL(/\/catalogo$/)
  await expect(page.locator('.results')).toHaveText('46 ramos')
})

test('la ficha pide el ramo por WhatsApp con nombre y precio', async ({ page }) => {
  await page.goto('/ramo/ramo-45-rose')
  const href = await page.getByRole('link', { name: 'Pedir por WhatsApp' }).getAttribute('href')
  expect(decodeURIComponent(href ?? '')).toContain('Rosé')
  expect(decodeURIComponent(href ?? '')).toContain('135.000')
})

test('el formulario de eventos valida, conserva respuestas y arma el mensaje', async ({ page }) => {
  await page.goto('/eventos/disena')
  await page.getByRole('button', { name: 'Continuar' }).click()
  await expect(page.locator('.validacion')).toContainText('elige el tipo de evento')
  await page.getByText('Cumpleaños', { exact: true }).click()
  await page.getByRole('button', { name: 'Continuar' }).click()
  await page.getByText('Romántico', { exact: true }).click()
  await page.getByRole('button', { name: 'Continuar' }).click()
  await page.getByText('Blancos, marfiles y crema').click()
  await page.getByRole('button', { name: 'Continuar' }).click()
  await page.getByText('Centros de mesa').click()
  await page.getByRole('button', { name: 'Atrás' }).click()
  await expect(page.locator('input[value=blancos]')).toBeChecked()
  await page.getByRole('button', { name: 'Continuar' }).click()
  await page.getByRole('button', { name: 'Ver mi resumen' }).click()
  const href = decodeURIComponent((await page.getByRole('link', { name: 'Enviar mi idea floral' }).getAttribute('href')) ?? '')
  expect(href).toContain('Tipo de evento: Cumpleaños.')
  expect(href).toContain('Elementos florales que necesito: Centros de mesa.')
})

test('una dirección que no existe muestra la página 404', async ({ page }) => {
  const r = await page.goto('/no-existe')
  expect(r?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta página no existe')
})

test('ninguna página se corre de lado en el celular', async ({ page }) => {
  for (const url of ['/', '/catalogo', '/ramo/ramo-01-rosita', '/eventos', '/eventos/disena']) {
    await page.goto(url)
    const { doc, vista } = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, vista: window.innerWidth }))
    expect(doc, url).toBeLessThanOrEqual(vista)
  }
})
