# Контекст дизайна проекта

## Статус документа

- Последнее обновление: 2026-08-05
- Область: страница каталога Banki.shop по `screenshots/page.jpg` и UI-kit
- Статус контекста дизайна: `partial`

## Источники и уверенность

| Источник                 | Статус           | Примечания                                                        |
| ------------------------ | ---------------- | ----------------------------------------------------------------- |
| User instructions        | `verified`       | Реализация страницы по предоставленному скриншоту                 |
| Figma MCP                | `unavailable`    | В текущем шаге не использовался                                   |
| Figma links              | `reference only` | Ссылка есть в SPEC.md, значения сверены по локальным изображениям |
| Screenshots / exports    | `verified`       | `screenshots/page.jpg` и `screenshots/ui-kit.jpg`                 |
| Existing code and styles | `verified`       | Vue 2.7, TypeScript, Webpack и существующая SCSS-архитектура      |

## Контекст реализации

### Стек фронтенда

- Фреймворк: Vue 2.7, Options API, TypeScript.
- Подход к стилям: SCSS Modules в отдельных файлах.
- Расположение стилей компонентов: рядом с компонентом (`ComponentName.module.scss`).
- Расположение глобальных стилей: `src/styles/main.scss`.

### SCSS-архитектура

- Точка входа глобальных стилей: `src/styles/main.scss`.
- Facade для Sass-only утилит: `src/styles/_tools.scss`.
- Общие хелперы: variables, typography mixins, `container`, transitions, hover/focus и media helpers.
- Базовые layout values требуют визуальной проверки на мобильной ширине.

## Страницы и секции

### Страница: каталог картин эпохи Возрождения

| Секция        | Статус       | Примечания                                                                |
| ------------- | ------------ | ------------------------------------------------------------------------- |
| Header        | `verified`   | Навигация и поиск в одной горизонтальной строке                           |
| Product grid  | `verified`   | Четыре карточки на desktop, изображения, название, автор, цена и действие |
| Footer        | `verified`   | Повтор навигации, телефон и адрес                                         |
| Product modal | `unresolved` | Требуется по SPEC, но не показан на `page.jpg`                            |

## Брейкпоинты

| Брейкпоинт | Статус     | Назначение                                      | Источник                               |
| ---------: | ---------- | ----------------------------------------------- | -------------------------------------- |
|    `360px` | `verified` | Минимальная ширина приложения                   | SPEC.md                                |
|    `768px` | `inferred` | Переход от мобильной к горизонтальной раскладке | существующий media helper              |
|   `1280px` | `inferred` | Desktop container/grid behavior                 | существующий media helper и screenshot |

### Правила брейкпоинтов

- На desktop header и footer используют горизонтальную раскладку.
- На узких экранах header должен перейти в вертикальный поток или переносить navigation/search.
- Product grid: 4 колонки на desktop, 2 колонки на tablet и 1 колонка на узком mobile — `inferred`.
- Точные мобильные значения не подтверждены отдельным скриншотом и требуют ручной проверки.

## Раскладка и контейнеры

| Переменная / хелпер |                                      Значение | Статус     | Назначение                             |
| ------------------- | --------------------------------------------: | ---------- | -------------------------------------- |
| `--padding`         |                `24px` desktop / `12px` mobile | `inferred` | Горизонтальный padding                 |
| `--content`         |                                      `1216px` | `inferred` | Основная ширина каталога по screenshot |
| `--container`       | `calc(var(--content) + (var(--padding) * 2))` | `verified` | Полная ширина контейнера               |
| `.container`        |                              основной wrapper | `verified` | Центрирование содержимого              |
| `.container._wide`  |                не требуется для этой страницы | `verified` | Зарезервированный helper               |
| `.container._thin`  |                не требуется для этой страницы | `verified` | Зарезервированный helper               |

## Цветовая архитектура

### Выбранная модель

`flat SCSS palette` с CSS-переменной для surface background.

### Инвентаризация цветов

| Исходное значение    | Предложенное имя     | Роль                      | Статус     | Целевой файл                          |
| -------------------- | -------------------- | ------------------------- | ---------- | ------------------------------------- |
| тёмный коричневый    | `$black` / `$accent` | текст, кнопки, navigation | `verified` | `src/styles/utils/_variables.scss`    |
| светлый серо-розовый | `$grey-light`        | borders и muted UI        | `verified` | `src/styles/utils/_variables.scss`    |
| фон страницы         | `--color-surface`    | body background           | `verified` | `src/styles/core/_css-variables.scss` |
| brown hover/in-cart  | component tokens     | состояния кнопки          | `verified` | `src/styles/utils/_variables.scss`    |

## Типографика

### Архитектура

```text
font()
→ atomic mixins
→ composite placeholders
→ global tags and classes
```

| Пресет | Брейкпоинт | Семейство    | Размер | Начертание | Интервал | Статус     |
| ------ | ---------: | ------------ | -----: | ---------: | -------: | ---------- |
| H1     |        all | Merriweather |   24px |        700 |     36px | `verified` |
| H2     |        all | Merriweather |   18px |        400 |     27px | `verified` |
| H3     |        all | Merriweather |   16px |        700 |     24px | `verified` |
| H4     |        all | Merriweather |   14px |        700 |     21px | `verified` |
| H5     |        all | Merriweather |   14px |        400 |     21px | `verified` |
| H6     |        all | Merriweather |   14px |        300 |     21px | `verified` |

Локальных файлов Merriweather нет; используется fallback `georgia, serif`.

## Отступы, радиусы, тени

| Значение | Роль                          | Статус     |
| -------: | ----------------------------- | ---------- |
|   `32px` | gap между карточками desktop  | `inferred` |
|   `48px` | высота action/header controls | `verified` |
|      `0` | радиусы карточек и кнопок     | `verified` |
|     none | тени                          | `verified` |

## Повторно используемые компоненты

| Кандидат      | Основание                  | Статус     | Примечания                  |
| ------------- | -------------------------- | ---------- | --------------------------- |
| `BaseButton`  | UI-kit states              | `verified` | Купить, в корзине, disabled |
| `BaseSearch`  | UI-kit и header            | `verified` | Emits input и submit        |
| `ProductCard` | четыре одинаковых карточки | `verified` | Данные передаются props     |
| `SiteHeader`  | header navigation/search   | `inferred` | Локальный page component    |
| `SiteFooter`  | footer navigation/contact  | `inferred` | Локальный page component    |

## Адаптивное поведение

### Product grid

| Диапазон       | Статус     | Поведение                           |
| -------------- | ---------- | ----------------------------------- |
| `1280px+`      | `verified` | Четыре карточки в одну строку       |
| `768px–1279px` | `inferred` | Две колонки                         |
| `360px–767px`  | `inferred` | Одна колонка, header/footer в поток |

### Ручные визуальные проверки

- [ ] Ширина каталога и отступы на desktop
- [ ] Перенос navigation/search на tablet и mobile
- [ ] Размеры карточек и crop изображений
- [ ] Перенос длинных названий и авторов
- [ ] Hover / focus / active / disabled states
- [ ] Empty state поиска
- [ ] Поведение modal и slider из SPEC.md

## Ассеты

| Ассет         | Источник         | Статус     | Целевое расположение   | Примечания         |
| ------------- | ---------------- | ---------- | ---------------------- | ------------------ |
| product-1.jpg | локальный export | `verified` | `src/assets/products/` | «Рождение Венеры»  |
| product-2.jpg | локальный export | `verified` | `src/assets/products/` | «Тайная вечеря»    |
| product-3.jpg | локальный export | `verified` | `src/assets/products/` | «Сотворение Адама» |
| product-4.jpg | локальный export | `verified` | `src/assets/products/` | «Урок анатомии»    |

## Открытые вопросы

1. Точные мобильные размеры header, footer и карточек не представлены отдельным кадром.
2. Тексты описаний и дополнительные изображения для modal не видны на page screenshot.
3. Иконки телефона и адреса в footer нужно реализовать без добавления зависимости или заменить текстовыми символами.

## Следующие шаги

1. Подготовить локальную модель каталога и подключить четыре изображения.
2. Реализовать header, product grid, footer и фильтрацию по поиску.
3. После этого отдельно реализовать modal и сохранение корзины по SPEC.md.
