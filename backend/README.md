# GreenCart Backend

## Project Overview

This is the Express/MongoDB API for GreenCart, a grocery/ecommerce application. It handles authentication, product management, cart synchronization, addresses, orders, Stripe checkout, and Stripe webhook processing.

The backend is an ES module Node.js service that connects to MongoDB and Cloudinary during startup and exposes cookie-based authenticated API routes for the frontend.

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Cloudinary for image storage
- Multer for multipart uploads
- Stripe for online payments
- CORS, cookie-parser, morgan
- Joi for validation
- Winston for logging

## Architecture Summary

- [server.js](server.js) is the application entry point. It loads middleware, connects to external services, registers routes, and starts the HTTP server.
- [config](config) contains environment loading and external service setup.
- [controllers](controllers) contains request handlers for user, product, cart, address, and order workflows.
- [routes](routes) maps HTTP endpoints to controllers and applies auth middleware where needed.
- [models](models) defines the MongoDB schemas for users, products, addresses, and orders.
- [middlewares](middlewares) contains authentication, authorization, and error handling.
- [utils](utils) contains reusable helpers such as custom errors, JWT helpers, logging, and validation schemas.

## Folder Structure

```text
backend/
  package.json
  server.js
  config/
    index.js
    db.js
    cloudinary.js
    multer.js
  controllers/
    userController.js
    productController.js
    cartController.js
    addressController.js
    orderController.js
  middlewares/
    authMiddleware.js
    errorMiddleware.js
  models/
    User.js
    Product.js
    Address.js
    Order.js
  routes/
    userRoute.js
    productRoute.js
    cartRoute.js
    addressRoute.js
    orderRoute.js
  utils/
    CustomError.js
    jwt.js
    logger.js
    productValidation.js
    userValidation.js
```

## Important Files

- [server.js](server.js): Express bootstrap, global middleware, route registration, Stripe webhook endpoint, and server start.
- [config/index.js](config/index.js): Loads environment variables from `.env`.
- [config/db.js](config/db.js): MongoDB connection logic.
- [config/cloudinary.js](config/cloudinary.js): Cloudinary client configuration.
- [config/multer.js](config/multer.js): Multer upload configuration for product images.
- [middlewares/authMiddleware.js](middlewares/authMiddleware.js): Cookie JWT authentication and seller authorization.
- [middlewares/errorMiddleware.js](middlewares/errorMiddleware.js): Centralized error response handling.
- [controllers/userController.js](controllers/userController.js): Registration, login, logout, and current-user lookup.
- [controllers/productController.js](controllers/productController.js): Product creation, listing, fetching, stock updates, and deletion.
- [controllers/orderController.js](controllers/orderController.js): COD checkout, Stripe checkout, Stripe webhooks, and order administration.
- [models/User.js](models/User.js): Stores users, roles, and cart state.
- [models/Product.js](models/Product.js): Stores product catalog data.
- [models/Address.js](models/Address.js): Stores shipping addresses.
- [models/Order.js](models/Order.js): Stores order items, totals, payment state, and order status.

## Implemented Features

- User registration and login
- Cookie-based JWT authentication
- Seller authorization for protected management routes
- Product listing and product detail lookup
- Seller product creation with image upload to Cloudinary
- Seller stock updates and product deletion
- Cart synchronization for authenticated users
- Shipping address creation and lookup
- Cash on delivery order placement
- Stripe checkout session creation
- Stripe webhook processing for payment success and failure
- Seller order listing, deletion, and status updates

## API Overview

Base routes are mounted under `/api` in [server.js](server.js).

- `/api/user`
  - `POST /register`
  - `POST /login`
  - `DELETE /logout`
  - `GET /me`
- `/api/product`
  - `POST /add`
  - `GET /list`
  - `GET /:id`
  - `PATCH /:id`
  - `DELETE /:id`
- `/api/cart`
  - `PATCH /update`
- `/api/address`
  - `POST /add`
  - `GET /get`
- `/api/order`
  - `POST /cod`
  - `POST /stripe`
  - `GET /user`
  - `GET /seller`
  - `DELETE /:orderId`
  - `PATCH /:orderId`
- `/stripe`
  - Stripe webhook endpoint used to verify payment events

## Environment Variables

Create a `.env` file in `backend/` with values like:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb+srv://user:pass@cluster.example.net
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Note: [config/db.js](config/db.js) appends `/greencart` to `MONGODB_URI` when connecting.

## Installation and Setup

1. Install dependencies.
2. Configure `backend/.env`.
3. Make sure MongoDB, Cloudinary, and Stripe credentials are valid.
4. Start the server.

```bash
npm install
npm run server
```

For production:

```bash
npm start
```

## Development Workflow

- Keep endpoint logic in [controllers](controllers) and route wiring in [routes](routes)
- Put cross-cutting request checks in [middlewares](middlewares)
- Keep schema changes in [models](models)
- Add validation logic in [utils/productValidation.js](utils/productValidation.js) and [utils/userValidation.js](utils/userValidation.js)
- Run the server with nodemon during development

## Build and Deployment

This backend does not have a build step. Deployment is runtime-based.

Typical production requirements:

- Set all environment variables
- Configure the MongoDB Atlas connection string
- Configure Cloudinary and Stripe secrets
- Allow the deployed frontend origin in CORS
- Expose the Stripe webhook endpoint at `/stripe`

## Known Limitations

- CORS is currently hardcoded to a single production origin in [server.js](server.js), so local frontend origins need to be added for development.
- [config/multer.js](config/multer.js) is minimal and should be verified in runtime before relying on image uploads in production.
- Some controller branches check for empty arrays as if they were null, which means a few “not found” responses are not reachable for empty query results.

## Future Improvements

- Add environment-specific CORS origin handling.
- Tighten request validation for order, address, and product payloads.
- Normalize webhook error handling and early returns.
- Add tests for authentication, Stripe webhook handling, and critical order flows.
