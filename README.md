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

Чтобы включить публикацию:

1. Отправьте проект в GitHub и убедитесь, что основная ветка называется `main`.
2. В репозитории откройте **Settings → Actions → General** и выберите **Read and write
   permissions** для `Workflow permissions`.
3. Откройте **Settings → Pages** и в разделе **Build and deployment** выберите источник
   **GitHub Actions**.
4. Выполните push в `main` или запустите workflow вручную во вкладке **Actions**.

После успешного запуска сайт будет доступен по адресу
`https://<владелец>.github.io/<имя-репозитория>/`.
