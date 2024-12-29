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

## Setup

### Prerequisites

- Node.js (version 18.20.2 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gtw-web.git
   cd gtw-web
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your environment variables.

### Running the Development Server

Start the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Tailwind CSS

- **Configuration File**: Tailwind CSS is configured in `tailwind.config.ts`.
  - Dark mode is enabled using both class and data attribute strategies.
  - Custom animations and font families are defined.
  - Reference:
    ```typescript:tailwind.config.ts
    startLine: 1
    endLine: 41
    ```

### Theming

- **Theme Initialization**: The theme is initialized using a script that sets the theme based on user preference or system settings.

  - Reference:
    ```typescript:src/lib/providers/Theme/InitTheme.tsx
    startLine: 1
    endLine: 50
    ```

- **Theme Provider**: Manages theme state and updates the document's data-theme attribute.
  - Reference:
    ```typescript:src/lib/providers/Theme/ThemeProvider.tsx
    startLine: 1
    endLine: 53
    ```

### Dynamic Content

- **Post Pages**: Dynamic pages for posts are generated using the slug as a parameter.
  - Reference:
    ```typescript:src/app/(web)/posts/[slug]/page.tsx
    startLine: 1
    endLine: 50
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
