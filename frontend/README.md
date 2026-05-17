# GreenCart Frontend

## Project Overview

This is the React client for GreenCart, a grocery/ecommerce application. It provides the customer storefront, cart and checkout flow, address management, order history, and the seller dashboard UI.

The frontend is a Vite application that uses React Router for navigation, a shared application context for auth/cart/product state, and axios for API calls to the backend.

## Tech Stack

- React 19
- Vite 6
- React Router DOM 7
- Axios
- React Hot Toast
- Tailwind CSS 4

## Architecture Summary

The app is organized around a shared context and route-based page composition.

- [src/main.jsx](src/main.jsx) bootstraps the app, wraps it in `BrowserRouter`, and provides the shared context.
- [src/App.jsx](src/App.jsx) defines the public routes, seller routes, shared chrome, and the login modal.
- [src/context/AppContext.jsx](src/context/AppContext.jsx) holds authenticated user state, seller state, cart state, product data, and axios configuration.
- [src/components](src/components) contains reusable UI sections such as the navbar, footer, product cards, banners, and login modals.
- [src/pages](src/pages) contains the routed screens for shopping, cart, orders, addresses, and seller management.
- [src/assets/assets.js](src/assets/assets.js) centralizes imported UI assets, category metadata, and demo data used by some components.

## Folder Structure

```text
frontend/
	index.html
	package.json
	vite.config.js
	eslint.config.js
	public/
	src/
		main.jsx
		App.jsx
		index.css
		assets/
			assets.js
		context/
			AppContext.jsx
		components/
			Navbar.jsx
			Footer.jsx
			Login.jsx
			Loading.jsx
			Loader.jsx
			MainBanner.jsx
			Categories.jsx
			BestSeller.jsx
			BottomBanner.jsx
			NewsLetter.jsx
			ProductCard.jsx
			seller/
				SellerLogin.jsx
		pages/
			Home.jsx
			AllProducts.jsx
			ProductCategory.jsx
			ProductDetails.jsx
			Cart.jsx
			AddAddress.jsx
			MyOrders.jsx
			NotFoundPage.jsx
			seller/
				SellerLayout.jsx
				AddProduct.jsx
				ProductList.jsx
				Orders.jsx
```

## Important Files

- [src/main.jsx](src/main.jsx): App entry point. Loads global styles and mounts the router and context provider.
- [src/App.jsx](src/App.jsx): Defines the main route tree, layout decisions, and seller access gating.
- [src/context/AppContext.jsx](src/context/AppContext.jsx): Handles fetching the current user, loading products, managing cart state, and exposing shared helpers like `addToCart`, `updateCartItem`, and `getCartAmount`.
- [src/components/Navbar.jsx](src/components/Navbar.jsx): Public navigation, auth entry point, search input, and cart badge.
- [src/components/ProductCard.jsx](src/components/ProductCard.jsx): Shared product tile used in listing pages and related product sections.
- [src/pages/Cart.jsx](src/pages/Cart.jsx): Cart summary, address selection, payment choice, and order submission.
- [src/pages/ProductDetails.jsx](src/pages/ProductDetails.jsx): Product detail view with gallery, description, and related products.
- [src/pages/seller/SellerLayout.jsx](src/pages/seller/SellerLayout.jsx): Seller shell with sidebar navigation and nested dashboard pages.
- [src/assets/assets.js](src/assets/assets.js): Shared icons, category images, banner assets, and demo data.

## Implemented Features

- Product browsing and category filtering
- Search across loaded products
- Product detail pages with related products
- User login and registration modal flow
- Cart add/remove/update with backend sync
- Shipping address creation and selection
- Order placement via cash on delivery
- Stripe checkout initiation from the cart
- User order history
- Seller login and seller dashboard layout
- Seller product list, add-product, and orders pages

## Backend Integration

The frontend expects a separate backend API and uses axios with credentials enabled.

- Base URL is read from `VITE_BACKEND_URL`
- Currency symbol is read from `VITE_CURRENCY`
- Auth is cookie-based, so the backend must allow credentials from the frontend origin
- API endpoints used by the app include:
  - `/api/user/me`
  - `/api/user/login`
  - `/api/user/register`
  - `/api/user/logout`
  - `/api/product/list`
  - `/api/product/:id`
  - `/api/cart/update`
  - `/api/address/add`
  - `/api/address/get`
  - `/api/order/cod`
  - `/api/order/stripe`
  - `/api/order/user`
  - seller order and product management endpoints under `/api/order` and `/api/product`

## Environment Variables

Create a `.env` file in `frontend/` with values like:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=$
```

Use the backend URL that matches your local server or deployed API.

## Installation and Setup

1. Install dependencies.
2. Configure `frontend/.env`.
3. Start the backend first.
4. Run the Vite dev server.

```bash
npm install
npm run dev
```

## Development Workflow

- Update shared state and API behavior in [src/context/AppContext.jsx](src/context/AppContext.jsx)
- Add or adjust route-level UI in [src/App.jsx](src/App.jsx)
- Keep reusable UI in [src/components](src/components)
- Keep page-specific logic in [src/pages](src/pages)
- Run lint before committing changes

```bash
npm run lint
```

## Build and Deployment

```bash
npm run build
npm run preview
```

Deploy the built output from `dist/` to your static host of choice. The deployed frontend must point to the correct backend URL and the backend must accept the deployed origin.

## Known Limitations

- The app relies on backend cookies and CORS configuration being correct in production.

## Future Improvements

- Add the missing contact page and route.
- Replace placeholder footer links with real destinations.
- Tighten runtime guards around product/cart/order edge cases.
- Add stronger empty-state and error-state handling for seller and checkout flows.
