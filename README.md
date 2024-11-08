## Getting Started

First, install the necessary packages:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Secondly, you must copy the `.env.example` file and rename it to `.env.local`,

```bash
cp .env.example .env.local
```

Thirt, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Structure and Rationale

This project follows a structured approach to ensure code maintainability, scalability, and ease of navigation. Below is a detailed explanation of each folder and its purpose.

## Folder Structure

### /hooks
This folder contains custom React hooks used throughout the application.

### /components
This folder is divided into two subfolders: `custom` and `ui`.

#### /custom
Contains reusable custom components.

#### /ui
Contains shadcnui components, such as buttons, modals, etc.

### /app
This folder contains the main application structure, including pages and global styles.

#### /login
Contains the login page.

#### /(pages)
Contains other pages of the application, structured by feature. Pages that require authentication should be under this folder.

### /lib
Contains utility functions and configurations.

### /store
Contains Zustand store configurations for state management.

### /types
Contains TypeScript interface and type definitions.

## Rationale
1. **Separation of Concerns**: By dividing the project into clearly defined folders, we ensure that each part of the codebase has a single responsibility, making it easier to manage and understand.
2. **Reusability**: Custom hooks and components are placed in their respective folders to promote reusability across the application.
3. **Scalability**: The folder structure is designed to scale as the project grows. New features can be added with minimal changes to the existing structure.
4. **Maintainability**: A well-organized codebase is easier to maintain, debug, and extend. By following a consistent structure, developers can quickly locate and modify the code.

By following these principles, we aim to create a robust and maintainable application.

