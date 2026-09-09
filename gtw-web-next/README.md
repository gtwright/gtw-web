# GTW Web

## Overview

GTW Web is a personal website built with Next.js, Tailwind CSS, and Payload CMS.

## Features

- **Dynamic Post Pages**: Automatically generates pages for blog posts based on their slugs.
- **Theming**: Supports both light and dark themes using Tailwind CSS.
- **Rich Text Rendering**: Utilizes a custom `RichText` component for rendering post content.
- **Static Site Generation**: Uses Next.js's static site generation capabilities with revalidation.
- **Admin Bar**: Includes an admin bar for managing content previews.
- **PostHog Analytics**: Integrated with PostHog for analytics tracking.

## Project Structure

```
/src
├── app/                # Next.js app router pages
│   ├── (admin)/       # Admin panel routes
│   ├── (web)/         # Public website routes
│   └── api/           # API endpoints
├── components/         # Reusable React components
│   ├── beethoven/     # Music visualization components
│   ├── blocks/        # PayloadCMS block components
│   └── ui/            # Shared UI components
├── lib/               # Utility functions and hooks
│   ├── providers/     # React context providers
│   └── utils/         # Helper functions
└── styles/            # Global styles and Tailwind config
```

## Setup

### Prerequisites

- Node.js (version 18.20.2 or later)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gtw-web.git
   cd gtw-web
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory using `.env.example` as a template.

### Environment Variables

Required variables:
- `PAYLOAD_SECRET`: Secret key for PayloadCMS authentication
- `PAYLOAD_PUBLIC_SERVER_URL`: URL for PayloadCMS server
- `NEXT_PUBLIC_SERVER_URL`: Base URL for the Next.js app
- `NEXT_PUBLIC_SITE_URL`: Production site URL
- `POSTHOG_KEY`: PostHog analytics API key
- `S3_BUCKET`: AWS S3 bucket for media storage
- `S3_REGION`: AWS S3 region
- `S3_ACCESS_KEY_ID`: AWS access key ID
- `S3_SECRET_ACCESS_KEY`: AWS secret access key
- `RESEND_API_KEY`: Resend.com API key for email

## Development

There are two ways to run the development environment:

### Option 1: Local Development with pnpm

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Option 2: Docker Development Environment

This approach runs both the Next.js application and PostgreSQL database in containers:

```bash
docker-compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000).

#### Docker Development Features
- Automatic reload on code changes
- PostgreSQL database included and configured
- Node modules volume for better performance
- Health checks for database connection

To rebuild the containers after dependency changes:

```bash
docker-compose up --build
```

To stop the containers:

```bash
docker-compose down
```

To clean up volumes:

```bash
docker-compose down -v
```

### Development Commands

Common commands for both approaches:
- `pnpm lint`: Run ESLint
- `pnpm build`: Create production build
- `pnpm start`: Run production build
- `pnpm generate:types`: Generate PayloadCMS types

### Future Improvements

#### Testing Implementation
- [ ] Add unit testing with Vitest
- [ ] Implement E2E testing with Playwright
- [ ] Add GitHub Actions for CI/CD
- [ ] Implement component testing with Testing Library

Current development practices:
- Manual testing in development environment
- Production build testing: `pnpm build && pnpm start`
- Linting: `pnpm lint`

### Data Flow

1. **Content Management**
   - Authors create/edit content in PayloadCMS admin panel
   - Content is stored in PostgreSQL database
   - Next.js generates static pages with ISR
   - Media assets are stored in S3

2. **User Interaction**
   - Client-side navigation using Next.js App Router
   - Theme preferences stored in localStorage
   - Analytics events sent to PostHog
   - Form submissions handled by server actions

3. **Authentication**
   - Admin authentication through PayloadCMS
   - JWT tokens for API authentication
   - Role-based access control for admin features

## Configuration

### Tailwind CSS

- **Configuration File**: Tailwind CSS is configured in `tailwind.config.ts`.
  - Dark mode is enabled using both class and data attribute strategies.
  - Custom animations and font families are defined.

### Theming

- **Theme Initialization**: The theme is initialized using a script that sets the theme based on user preference or system settings.
- **Theme Provider**: Manages theme state and updates the document's data-theme attribute.

### Dynamic Content

- **Post Pages**: Dynamic pages for posts are generated using the slug as a parameter.
- **Preview Mode**: Supports draft preview using PayloadCMS admin bar.

## API Endpoints

- `/api/preview`: Enables draft preview mode
- `/api/exit-preview`: Disables draft preview mode
- `/api/revalidate`: Triggers on-demand ISR

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

Please ensure your PR:
- Follows the established code style
- Includes appropriate tests
- Updates documentation as needed
- References any related issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.
