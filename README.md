# DigiMarket - Full-Stack E-commerce Platform

This README provides a comprehensive overview of the DigiMarket project, which includes both the frontend and backend applications.

## Overview

DigiMarket is a modern, full-stack e-commerce platform designed for selling digital products. It features a user-friendly interface for customers and a robust backend for managing products, users, and orders.

The project is split into two main parts:

*   **`digimarket-frontend`**: A Next.js application that provides the client-facing user interface.
*   **`digimarket-backend`**: A Laravel application that serves as the RESTful API backend.

---

## Features

*   **Secure User Authentication:** User registration and login using Laravel Passport for OAuth2-based security.
*   **Product Catalog:** Browse, search, and filter digital products.
*   **Shopping Cart:** A persistent shopping cart for guests and logged-in users.
*   **Seamless Checkout:** A multi-step checkout process for a smooth user experience.
*   **Order Management:** Users can view their order history and download purchased products.
*   **Admin Capabilities:** Role-based access control for administrators to manage products, categories, and users.
*   **File Uploads:** Securely upload and manage digital product files.

---

## Tech Stack

### Frontend (`digimarket-frontend`)

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Material-UI (MUI)](https://mui.com/)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **HTTP Client:** [Axios](https://axios-http.com/)
*   **Linting:** [ESLint](https://eslint.org/)

### Backend (`digimarket-backend`)

*   **Framework:** [Laravel](https://laravel.com/)
*   **Language:** [PHP](https://www.php.net/)
*   **API:** RESTful API with [Laravel Passport](https://laravel.com/docs/passport) for authentication.
*   **Database:** PostgreSQL
*   **Permissions:** [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction) for role-based access control.

---

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v20 or later)
*   [PHP](https://www.php.net/) (v8.4 or later)
*   [Composer](https://getcomposer.org/)
*   [Docker](https://www.docker.com/) (optional, for database)
*   A local database (e.g., PostgreSQL)

### 1. Backend Setup (`digimarket-backend`)

1.  **Navigate to the backend directory:**
    ```bash
    cd ../digimarket-backend
    ```
2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```
3.  **Setup environment file:**
    Copy `.env.example` to `.env` and configure your database credentials (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
    ```bash
    cp .env.example .env
    ```
4.  **Generate application key:**
    ```bash
    php artisan key:generate
    ```
5.  **Run database migrations:**
    This will create all the necessary tables in your database.
    ```bash
    php artisan migrate
    ```
6.  **Install Passport for authentication:**
    ```bash
    php artisan passport:install
    ```
7.  **Start the backend server:**
    The API will be available at `http://localhost:8000`.
    ```bash
    php artisan serve
    ```

### 2. Frontend Setup (`digimarket-frontend`)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../digimarket-frontend
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
3.  **Setup environment file:**
    Create a `.env.local` file. Add the backend API URL so the frontend knows where to send requests.
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
    ```
4.  **Start the frontend development server:**
    The application will be available at `http://localhost:3000`.
    ```bash
    npm run dev
    ```

---

## API Endpoints (`/api/v1`)

The backend provides the following key API endpoints:

*   **Authentication:**
    *   `POST /signup`: Register a new user.
    *   `POST /signin`: Log in a user and receive an auth token.
    *   `POST /logout`: Log out the current user (requires auth).
*   **Products:**
    *   `GET /products`: Get a list of all products.
    *   `GET /products/{id}`: Get details for a single product.
*   **Cart:**
    *   `GET /cart-items`: Get the contents of the user's cart (requires auth).
    *   `POST /cart-items`: Add an item to the cart (requires auth).
    *   `DELETE /cart-items/{id}`: Remove an item from the cart (requires auth).
*   **Orders:**
    *   `GET /orders`: Get the user's order history (requires auth).
    *   `POST /orders`: Create a new order from the cart (requires auth).

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
