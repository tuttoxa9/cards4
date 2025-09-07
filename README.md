# Collectible Cards Catalog

Интерактивный сайт-каталог для презентации и продажи коллекционных карточек с минималистичным дизайном и голографическими эффектами.

## Особенности

- ✨ Минималистичный и чистый дизайн
- 🎯 Hero-секция с анимацией трансформации при скролле
- 📱 Адаптивный дизайн для всех устройств
- 🎮 Интерактивные 3D карточки с Three.js
- 🚀 Плавные анимации с Framer Motion
- 💫 Горизонтальные переходы между экранами
- 🎨 Голографические эффекты на карточках

## Технологии

- **Next.js 15** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Framer Motion** - Анимации
- **Three.js** - 3D эффекты
- **shadcn/ui** - UI компоненты

## Развертывание на Cloudflare Pages

### Автоматическое развертывание

1. Войдите в [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Перейдите в Pages > Create a project
3. Подключите GitHub репозиторий
4. Настройте сборку:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`

### Ручное развертывание

```bash
# Установка зависимостей
npm install

# Сборка для продакшена
npm run build

# Папка 'out' готова для загрузки на Cloudflare Pages
```

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Проверка типов и линтинг
npm run lint

# Форматирование кода
npm run format
```

## Структура проекта

```
src/
├── app/                 # App Router pages
├── components/          # React компоненты
│   ├── HeroSection.tsx         # Hero секция с анимацией
│   ├── CategoriesSection.tsx   # Секция категорий
│   ├── ProductCatalog.tsx      # Каталог товаров
│   ├── ProductDetail.tsx       # Детальный просмотр
│   └── InteractiveCard.tsx     # 3D карточка
├── types/               # TypeScript типы
└── lib/                 # Утилиты
```

## Настройка для статического экспорта

Проект настроен для статической генерации с помощью:

- `output: 'export'` в next.config.js
- `trailingSlash: true` для правильной маршрутизации
- `images.unoptimized: true` для работы без Image Optimization API

## Лицензия

MIT
