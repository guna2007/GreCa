# Project Overview

GreenCart is a full-stack grocery application for customer ordering and seller operations.

What it does:

- Customers browse products, manage cart items, save shipping addresses, and place orders.
- Sellers manage products and process incoming orders.

Project purpose:

- Provide an end-to-end ecommerce workflow with a clear separation between frontend, API, and backend services.

Short end-to-end workflow:

- Frontend fetches products and user session data from the backend.
- Authenticated users update cart and place COD or Stripe checkout orders.
- Backend validates requests, writes to MongoDB, uploads images to Cloudinary, and handles Stripe webhook events.

# Key Features

- User registration and login
- Cookie-based JWT authentication
- Product listing, filtering, and product details
- Search on product catalog
- Cart add/update/remove with backend synchronization
- Address creation and selection for checkout
- Order placement via Cash on Delivery
- Stripe checkout session creation for online payment
- User order history view
- Seller login and protected seller routes
- Seller product add/list/stock update/delete
- Seller order list, status update, and delete

# Tech Stack

Frontend

React

- Component-based UI architecture
- Efficient state-driven rendering
- Well-suited for route-based ecommerce interfaces

React Router DOM

- Client-side routing across customer and seller pages
- Nested route support for seller dashboard
- Clean URL structure for catalog and product views

Vite

- Fast local development server
- Quick build pipeline for production assets
- Minimal configuration for React projects

Tailwind CSS

- Utility-first styling model
- Consistent design tokens and responsive layout control
- Fast UI iteration across many components

Backend

Node.js

- JavaScript runtime shared with frontend language
- Suitable for I/O-heavy API workloads
- Large ecosystem for ecommerce integrations

Express

- Lightweight API layer
- Clear middleware pipeline for auth/error handling
- Straightforward route-controller structure

Database

MongoDB Atlas

- Managed cloud database service
- Flexible document model for product/order data
- Easy scaling and remote access control

Mongoose

- Schema definitions and validation helpers
- Model relationships for orders, users, products, addresses
- Query abstraction for controller logic

Authentication

JWT + cookie-based auth

- Stateless token verification on protected endpoints
- Browser-friendly session handling via HTTP cookies
- Supports role-based access checks

bcrypt

- Password hashing before persistence
- Secure credential comparison during login
- Reduces password storage risk

Payments

Stripe Checkout + Webhooks

- Hosted checkout for online payment flow
- Server-side webhook verification for payment result updates
- Reliable payment event lifecycle handling

Storage

Cloudinary

- Offloads product image storage and delivery
- URL-based asset access in frontend
- Simplifies media management from backend controllers

Libraries

Axios

- HTTP client for frontend-backend communication
- Centralized API base URL and credentials behavior
- Promise-based request handling in React pages/context

Joi

- Request payload validation in backend
- Consistent input constraints for product/user data
- Early rejection of invalid request formats

Multer

- Multipart form parsing for product image uploads
- Temporary file handling before Cloudinary upload
- Integrates directly with Express route middleware

Tools

ESLint

- Static analysis for frontend code quality
- Enforces consistent patterns and hooks rules
- Reduces runtime issues before deployment

Nodemon

- Auto-restart backend in development
- Faster feedback loop while editing server code
- Simplifies local API development workflow

# System Architecture

Frontend -> API Layer -> Backend -> Database -> External Services

Request lifecycle:

- UI action triggers an Axios request.
- Express route applies middleware (auth/authorization as needed).
- Controller executes business logic and DB operations.
- Response returns JSON to frontend and updates UI state.

Authentication flow:

- User logs in/registers from frontend.
- Backend issues JWT and sets auth cookie.
- Protected routes read cookie token and attach authenticated user context.

Data flow:

- Catalog data: backend product endpoints -> frontend list/detail pages.
- Cart data: frontend state -> cart update API -> user document in MongoDB.
- Orders: checkout request -> order write -> optional Stripe event -> order/payment state update.

# Application Breakdown

Complete flow

User Journey:

Home
↓
Product Listing
↓
Product Details
↓
Cart
↓
Address
↓
Checkout
↓
Payment
↓
Order History

Seller/Admin Journey:

Seller Login
↓
Dashboard
↓
Add Product
↓
Manage Products
↓
Manage Orders

Page details

Page Name: Home
Purpose: Entry storefront for customers.
Main functionality: Banner sections, category entry points, best sellers.
Connected APIs: Indirectly uses product list through shared app context.

Page Name: All Products
Purpose: Full catalog browsing.
Main functionality: Product grid, search filter, stock-filtered rendering.
Connected APIs: GET /api/product/list.

Page Name: Product Category
Purpose: Category-focused product browsing.
Main functionality: Filters products by selected category route param.
Connected APIs: Uses catalog data loaded from GET /api/product/list.

Page Name: Product Details
Purpose: Product-specific detail view.
Main functionality: Gallery, description, add-to-cart, buy-now, related products.
Connected APIs: Uses catalog data loaded from GET /api/product/list.

Page Name: Cart
Purpose: Checkout preparation and order submission.
Main functionality: Quantity updates, address selection, COD/Stripe order submission.
Connected APIs: PATCH /api/cart/update, GET /api/address/get, POST /api/order/cod, POST /api/order/stripe.

Page Name: Add Address
Purpose: Save shipping address.
Main functionality: Address form creation and persistence.
Connected APIs: POST /api/address/add.

Page Name: My Orders
Purpose: Customer order history.
Main functionality: Displays order items, payment type, status, and totals.
Connected APIs: GET /api/order/user.

Page Name: Contact
Purpose: Support information.
Main functionality: Shows contact channels.
Connected APIs: None.

Page Name: Seller Login
Purpose: Seller authentication entry.
Main functionality: Seller credential login and route access.
Connected APIs: POST /api/user/login.

Page Name: Seller Dashboard (Layout)
Purpose: Seller workspace shell.
Main functionality: Seller navigation and nested route rendering.
Connected APIs: None directly.

Page Name: Seller Add Product
Purpose: Create new product entries.
Main functionality: Upload images and submit product metadata.
Connected APIs: POST /api/product/add.

Page Name: Seller Manage Products (Product List)
Purpose: Manage catalog records.
Main functionality: View products and perform stock/delete actions.
Connected APIs: GET /api/product/list, PATCH /api/product/:id, DELETE /api/product/:id.

Page Name: Seller Manage Orders
Purpose: Process customer orders.
Main functionality: View seller order feed, update order status, delete order.
Connected APIs: GET /api/order/seller, PATCH /api/order/:orderId, DELETE /api/order/:orderId.

# Complete Folder Structure

```text
backend/
  package.json
  .env.example
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
    userValidation.js
    productValidation.js

frontend/
  package.json
  .env.example
  vite.config.js
  eslint.config.js
  index.html
  public/
  src/
    App.jsx
    main.jsx
    index.css
    assets/
      assets.js
      ...static images/icons
    components/
      Navbar.jsx
      Footer.jsx
      Login.jsx
      ProductCard.jsx
      ...shared ui components
      seller/
        SellerLogin.jsx
    context/
      AppContext.jsx
    pages/
      Home.jsx
      AllProducts.jsx
      ProductCategory.jsx
      ProductDetails.jsx
      Cart.jsx
      AddAddress.jsx
      MyOrders.jsx
      Contact.jsx
      Loading.jsx
      NotFoundPage.jsx
      seller/
        SellerLayout.jsx
        AddProduct.jsx
        ProductList.jsx
        Orders.jsx
```

Folder responsibilities

controllers: Implements backend business logic per domain endpoint.

routes: Defines API endpoints and maps them to controllers.

middlewares: Applies authentication/authorization and centralized error handling.

models: Defines Mongoose schemas and model-level behavior.

config: Initializes environment, DB, storage, and upload configuration.

utils: Reusable helpers for validation, custom errors, logging, and JWT support.

components: Reusable frontend UI blocks used across pages.

pages: Route-level frontend screens for user and seller flows.

context: Shared app state and API integration logic.

hooks: No dedicated hooks directory currently; shared reactive logic is implemented in context/components/pages.

assets: Static UI/media assets and shared asset metadata.

# Environment Variables

Backend variables

PORT

- Purpose: Backend runtime port.
- Where to obtain it: Local environment choice.
- How to generate/get it: Choose an available port such as 5000.

NODE_ENV

- Purpose: Runtime mode flag.
- Where to obtain it: Local/deployment environment setting.
- How to generate/get it: Set to development locally, production in deployment.

JWT_SECRET

- Purpose: Sign and verify JWT tokens.
- Where to obtain it: Generated locally.
- How to generate/get it: Run openssl rand -base64 32 and use the output.

MONGODB_URI

- Purpose: MongoDB connection URI base.
- Where to obtain it: MongoDB Atlas cluster connection panel.
- How to generate/get it:
  1. Create Atlas project and cluster.
  2. Create DB user and allow network access.
  3. Copy Node.js SRV URI from Atlas Connect.

CLOUDINARY_NAME

- Purpose: Cloudinary cloud identifier.
- Where to obtain it: Cloudinary dashboard.
- How to generate/get it: Create Cloudinary account and copy Cloud Name.

CLOUDINARY_API_KEY

- Purpose: Cloudinary API authentication key.
- Where to obtain it: Cloudinary dashboard API credentials.
- How to generate/get it: Copy API Key from account settings.

CLOUDINARY_API_SECRET

- Purpose: Cloudinary API secret credential.
- Where to obtain it: Cloudinary dashboard API credentials.
- How to generate/get it: Copy API Secret from account settings.

STRIPE_SECRET_KEY

- Purpose: Server-side Stripe API operations.
- Where to obtain it: Stripe dashboard Developers -> API keys.
- How to generate/get it: Copy secret key for test/live mode.

STRIPE_PUBLISHABLE_KEY

- Purpose: Client-side Stripe key reference.
- Where to obtain it: Stripe dashboard Developers -> API keys.
- How to generate/get it: Copy publishable key for test/live mode.

STRIPE_WEBHOOK_SECRET

- Purpose: Verify Stripe webhook signatures.
- Where to obtain it: Stripe webhook endpoint settings.
- How to generate/get it:
  1. Create webhook endpoint.
  2. Subscribe to payment events used by this app.
  3. Copy signing secret (whsec\_\*).

FRONTEND_URL

- Purpose: CORS allowlist for frontend origins.
- Where to obtain it: Your local and deployed frontend URLs.
- How to generate/get it: Provide comma-separated origin values.

Frontend variables

VITE_BACKEND_URL

- Purpose: Frontend API base URL.
- Where to obtain it: Local/deployed backend URL.
- How to generate/get it: Set to backend origin such as http://localhost:5000.

VITE_CURRENCY

- Purpose: Currency symbol in price rendering.
- Where to obtain it: Project configuration choice.
- How to generate/get it: Set symbol value such as $.

# Local Setup

Clone project

```bash
git clone <repo-url>
cd <project-name>
```

Backend setup

```bash
cd backend
npm install
```

Frontend setup

```bash
cd frontend
npm install
```

Database setup

- Create MongoDB Atlas cluster.
- Create DB user and allow network access.
- Copy connection URI into backend environment config.

Environment setup

- Copy backend/.env.example to backend/.env and set all required values.
- Copy frontend/.env.example to frontend/.env and set required values.

Run locally

```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

# Available Scripts

Backend

npm run dev

- Starts backend with nodemon for local development.

npm run server

- Starts backend with nodemon (legacy alias retained).

npm start

- Starts backend with Node.js.

Frontend

npm run dev

- Starts Vite development server.

npm run build

- Builds production frontend assets.

npm run preview

- Serves the production build locally for verification.

npm run lint

- Runs ESLint checks on frontend code.

# Technical Decisions

Why MERN stack

- Single-language development across frontend and backend.
- Fast development for API + UI integration.
- Flexible schema model for ecommerce data shapes.

Why React

- Modular component structure for reusable UI.
- Good fit for route-driven storefront and dashboard pages.
- Strong ecosystem for state, routing, and tooling.

Why Context API

- Centralized app state for auth, products, and cart without external state libraries.
- Sufficient for current project scope.
- Simplifies shared API/data access across pages.

Why JWT cookie auth

- Stateless token verification on backend.
- Cookie transport integrates naturally with browser sessions.
- Supports protected routes and role checks.

Why MongoDB

- Document model works well for products, cart object maps, and nested order items.
- Flexible evolution of schemas during feature growth.
- Managed Atlas service simplifies operations.

Why Cloudinary

- Handles image hosting and delivery outside backend filesystem.
- Keeps media concerns separate from core API.
- Simplifies upload-to-URL workflow.

Why Stripe

- Standard hosted checkout flow with secure payment handling.
- Reliable webhook model for payment confirmation.
- Clear API for session creation and event processing.

Why Express

- Minimal framework with explicit middleware flow.
- Clear route/controller composition.
- Good compatibility with Node ecosystem packages used here.

# Deployment Notes

Frontend deployment

- Run npm run build in frontend.
- Deploy frontend dist output to static hosting.
- Set VITE_BACKEND_URL to deployed backend origin.

Backend deployment

- Deploy backend service with Node runtime.
- Configure all backend environment variables.
- Ensure /stripe endpoint is publicly reachable for Stripe webhooks.

Environment variables

- Use separate values per environment (local, staging, production).
- Keep secrets outside source control.
- Validate key availability before startup.

Stripe webhook setup

- Create endpoint pointing to <backend-url>/stripe.
- Add required payment events.
- Copy webhook signing secret to STRIPE_WEBHOOK_SECRET.
