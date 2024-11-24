# Stationery Shop Backend

Welcome to the **Stationery Shop Backend** project! This is a Node.js and Express-based API for managing a stationery shop. The backend handles product management, order processing, and revenue calculations with robust error handling and efficient database operations using MongoDB and Mongoose.

## Live Link

The backend is live at: [Stationery Shop Backend](https://stationary-shop-backend-xi.vercel.app/)

## Features

- **Product Management**:
  - Add, update, delete, and retrieve products.
  - Stock quantity management with in-stock status updates.
- **Order Management**:
  - Place orders with validation for stock availability.
  - Automatic stock updates after order placement.
- **Revenue Tracking**:
  - Calculate total revenue from completed orders.
- **Error Handling**:
  - Clear error messages for invalid inputs, out-of-stock products, and more.
- **Database Integration**:
  - Use of **Mongoose** for modeling and validating MongoDB data.

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Deployment**: Vercel

## API Endpoints

### Products

- **GET /api/products**: Retrieve all products.
- **GET /api/products/:id**: Retrieve a single product by ID.
- **POST /api/products**: Add a new product.
- **PATCH /api/products/:id**: Update a product.
- **DELETE /api/products/:id**: Delete a product.

### Orders

- **POST /api/orders**: Place a new order.
- **GET /api/orders/revenue**: Calculate total revenue.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- MongoDB instance or connection string.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/bapibiswas100808/stationary-shop
   cd stationary-shop-backend
   npm i
   Create a .env file in the root directory and add:
   DATABASE_URL=<your-mongodb-connection-string>
   PORT=5000
   npm run build
   npm start
   ```
