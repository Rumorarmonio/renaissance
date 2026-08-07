# Banki.shop

Адаптивная страница интернет-магазина по макету Figma.

## Требования

- Node.js 16.x
- npm

## Команды

```bash
npm install
npm run serve
npm run typecheck
npm run build
```

Приложение в режиме разработки доступно по адресу `http://localhost:8080`.

## Публикация на GitHub Pages

В репозитории уже настроен workflow `.github/workflows/deploy-pages.yml`. Он запускается
при push в `main`, выполняет проверку типов, собирает приложение и публикует папку `dist`
на GitHub Pages.
