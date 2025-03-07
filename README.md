# Restaurant Vue Project 🍽️

This project is a **Restaurant Ordering System** built with **Vue 3** and **Vite**, utilizing **JSONPlaceholder** as a dummy API for product data. The app allows users to browse restaurant menu items, add items to their cart, and proceed to checkout.

## Features

- Browse menu items
- Add items to cart
- View cart details
- Remove items from cart
- Checkout process

## Tech Stack

- Vue 3
- Vite
- Tailwind CSS (optional, if used)
- JSONPlaceholder (dummy API)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (for Vue 3 support)

## Project Setup

### Install Dependencies
```sh
npm install
```

### Build for Production
```sh
npm run build
```

### API Usage

This project uses JSONPlaceholder as a dummy API to simulate restaurant menu data.

Example API Endpoint:
```sh
https://jsonplaceholder.typicode.com/posts
```

### Installing JSONPlaceholder Locally
If you want to use JSONPlaceholder locally, follow these steps: 
1. Navigate to the database-jsonPlaceholder folder.
2. Install JSON Server globally: sh Copy Edit

```sh
npm install -g json-server
```

3. Start the JSON server with the provided db.json file:
```sh
json-server --watch db.json --port 3000
```

4. The API will be available at:
```sh
http://localhost:3000/best-products
http://localhost:3000/products
http://localhost:3000/carts
http://localhost:3000/orders
```

5. Contributing
Feel free to fork this project, submit issues, or make pull requests.



