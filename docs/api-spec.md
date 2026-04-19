# GarajOS API Specification

## Module Overview

- Auth API
- User API
- Vehicle API
- Garage API
- Booking API
- Chat API
- Marketplace API
- Order API
- Community API

## Suggested REST Endpoints

### Auth

- `POST /auth/send-otp`
- `POST /auth/verify-otp`
- `POST /auth/google`
- `GET /auth/me`

### Users

- `GET /users/me`
- `PATCH /users/me`
- `PATCH /users/me/profile`

### Vehicles

- `GET /vehicles`
- `POST /vehicles`
- `GET /vehicles/:vehicleId`
- `PATCH /vehicles/:vehicleId`
- `POST /vehicles/:vehicleId/documents`
- `GET /vehicles/:vehicleId/service-history`

### Garages

- `GET /garages/nearby`
- `GET /garages`
- `GET /garages/:garageId`
- `GET /garages/:garageId/slots`
- `POST /garages/register`

### Bookings

- `POST /bookings`
- `GET /bookings`
- `GET /bookings/:bookingId`
- `PATCH /bookings/:bookingId/status`
- `POST /bookings/:bookingId/approval`

### Chat

- `GET /chats`
- `GET /chats/:chatId/messages`
- `POST /chats/:chatId/messages`
- `POST /chats/:chatId/attachments`

### Marketplace

- `GET /marketplace/categories`
- `GET /marketplace/products`
- `GET /marketplace/products/:productId`
- `POST /marketplace/cart/items`
- `POST /marketplace/checkout`

### Orders

- `GET /orders`
- `GET /orders/:orderId`
- `PATCH /orders/:orderId/status`

### Community

- `GET /community/feed`
- `POST /community/posts`
- `GET /community/groups`
- `POST /community/groups`

## Notes

- Use JWT-based auth after OTP or Google login.
- Keep booking, chat, and marketplace events auditable.
- Design APIs to support later microservice extraction.
