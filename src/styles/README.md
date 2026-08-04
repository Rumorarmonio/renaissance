# Шаблон SCSS

`src/styles/main.scss` - единственная глобальная точка входа для CSS.

`src/styles/_tools.scss` - Sass-only facade для `additionalData`.
Он не должен генерировать реальный CSS.

После настройки сборщика `.module.scss` файлы не должны вручную импортировать общие `functions`, `mixins`, `variables`, `breakpoints` и typography helpers.

## Соглашения по файлам

- Частичные файлы начинаются с `_`.
- Файлы-агрегаторы внутри директорий используют `_index.scss`.
- Стили компонентов следуют паре:
  - `ComponentName.vue`
  - `ComponentName.module.scss`

## Токены дизайна

Плоская цветовая палитра - это стартовый набор. Его нужно обновить после анализа конкретной дизайн-системы проекта.

Двухуровневые `primitives` / `semantic tokens` автоматически не создаются.

## Layout variables

CSS-переменные layout-слоя - это стартовая база:

- `--padding`
- `--padding-negative`
- `--content`
- `--container`
- `--container-wide`
- `--container-thin`

Короткие модификаторы вроде `._wide` и `._thin` допустимы только вместе с базовым классом.

Поведенческие флаги вроде `.no-padding` и `.desktop-only` остаются отдельными классами.

`container()` поддерживает `$with-padding: false`, поэтому вызывающий код может отключить встроенный padding и задать его явно в селекторе, если это нужно.

`$mobile-360` - это reference width, а не обязательный breakpoint для отдельного layout.

Media utilities доступны глобально.

Scrollbar helpers работают кроссбраузерно, но визуально не идентичны во всех браузерах:

- `scrollbar-width` в Firefox принимает только `auto`, `thin` или `none`;
- pixel width/height в `scrollbar()` и `scrollbar-horizontal()` в основном влияют на браузеры на WebKit;
- цвета передаются как аргументы mixin, поэтому helpers не зависят от глобальных CSS-переменных скроллбара.

Используй их, когда нужен браузерный helper, который нормально работает в Chrome, Edge, Safari и Firefox, а не пиксельно одинаковый scrollbar во всех движках.

`references/optional/` не подключается автоматически.

Отдельные optional-слои лежат здесь:

- `references/optional/styles/vendor/`;
- `references/optional/styles/motion/`.

`references/examples/` не копируется в проект автоматически.

Примеры motion и keyframes лежат здесь:

- `references/examples/styles/motion/`.
- `references/examples/styles/animations/`.

Там лежат отдельные эталонные примеры:

- Vue transition-классы;
- keyframes.

## Reset, common, typography

`core/_reset.scss` содержит только browser reset rules.
`core/_common.scss` содержит глобальные проектные соглашения и layout helpers.
`core/_typography.scss` содержит глобальные typography classes и tag styles.
`core/_css-variables.scss` содержит layout CSS variables и root-level project placeholders.
`core/_utilities.scss` содержит небольшие глобальные utility-классы, включая текстовые helpers вроде `.italic`, `i`, `em`, `.text-bold`, `.uppercase`, `.underline` и `.line-through`.
`core/_media-utilities.scss` содержит viewport helper-классы.
`fonts/_index.scss` зарезервирован для реальной загрузки шрифтов через `@font-face` или другой проектный способ.
Локальные файлы шрифтов можно хранить прямо в `fonts/` рядом с `_index.scss`, если проект держит их на одном уровне.

## Как использовать архитектуру

- Сначала используй существующие mixins, helpers и utility-классы, а не пиши новый ad hoc CSS.
- Для hover-состояний используй `@include hover` и `@include hover-active`, а не дублируй логику hover вручную.
- Для анимируемых свойств используй `@include transition(...)`; `:active` оставляй обычным псевдоклассом, потому что отдельного mixin для него нет.
- Для адаптивного поведения предпочитай `min-*` и `desktop-*` media helpers вместо ручных `@media`, если нужный breakpoint уже существует.
- Держи media override рядом с тем селектором, который он меняет, чтобы файл читался сверху вниз.
- Для показа и скрытия элементов на брейкпоинтах сначала используй utility-классы из `core/_media-utilities.scss`:
  - `.max-*` для скрытия на более широких экранах;
  - `.min-*` для скрытия на более узких экранах.
- Не пиши `display: none` вручную в SCSS, если задачу уже покрывает `core/_media-utilities.scss`.
- Не сочетай несколько atomic typography utility-классов на одном элементе: они будут переопределять друг друга.
- Для быстрого применения типографики к элементу и его потомкам используй utility-классы из `core/_typography.scss`.
- Для простых текстовых модификаторов вроде italic, bold, uppercase, underline и line-through используй utility-классы из `core/_utilities.scss`.
- Atomic typography utility-классы берутся из `utils/typography/_atomic.scss` через `core/_typography.scss`.
- Composite typography rules берутся из `utils/typography/_composite.scss` через `core/_typography.scss`.
- Если шрифт должен меняться на брейкпоинтах, предпочитай composite-правила типографики.
- Если шрифт не должен меняться на брейкпоинтах, используй atomic-правила типографики.
- Сначала переиспользуй уже существующие typography presets, и только потом добавляй новый.
- Глобальные vendor overrides складывай в `references/optional/styles/vendor/`, а motion helpers - в `references/optional/styles/motion/`, если это слой уровня проекта.
- Для WYSIWYG, CMS и rich text контента используй `references/optional/styles/content/_prose.scss` через `references/optional/styles/content/_index.scss`, если такой контент в проекте действительно есть.
- Для локальных шрифтов используй `font-face` helper из `utils/_mixins.scss`; он стандартизирует `@font-face`-объявления и подходит для `fonts/_index.scss`.
- Для блоков с вычисляемой пропорцией используй `aspect-ratio` helper из `utils/_mixins.scss`.

## Общие рекомендации по вёрстке

- Для раскладок по одной оси по умолчанию используй `flex`; `grid` оставляй для действительно двумерных сеток, сложного позиционирования или перекрытий.
- Используй `gap` только там, где интервалы между элементами равномерные и задаются как единый внутренний поток.
- Если расстояния между блоками неравномерные или зависят от смысла соседних элементов, используй `margin-top` / `margin-bottom` вместо `gap`.
- Для вертикальных стэков по умолчанию предпочитай `margin-top`; `margin-bottom` используй, если так проще выразить конкретную структуру или уже есть устоявшийся паттерн.

## Vue и Nuxt

### Точка входа Nuxt / Vite

Подключай глобальный stylesheet один раз:

```ts
// main.ts or nuxt plugin
import '@/styles/main.scss'
```

### Sass additionalData

Подключай Sass-only facade глобально:

```js
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "@/styles/_tools.scss" as *;`,
    },
  },
}
```

## Заметки

- `src/styles/main.scss` генерирует реальный global CSS.
- `src/styles/_tools.scss` - только для общего Sass access.
- Плоские значения палитры - это placeholder до анализа дизайн-системы.
- Длительности переходов живут в Sass variables: `$transition` и `$transition-short`.
- `--transition` не используется в базовом шаблоне.
- `references/core/styles/` - единственный source of truth для этого шаблона.
