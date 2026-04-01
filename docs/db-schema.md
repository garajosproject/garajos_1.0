# GarajOS Database Schema Draft

## Core Entities

### User

- id
- phone
- email
- name
- role
- location
- bikeType
- createdAt

### Vehicle

- id
- userId
- brand
- model
- year
- registrationNumber
- fuelType
- odometer

### VehicleDocument

- id
- vehicleId
- type
- url
- expiryDate
- reminderEnabled

### Garage

- id
- ownerUserId
- name
- address
- geoLat
- geoLng
- rating
- verificationStatus

### GarageService

- id
- garageId
- name
- priceMin
- priceMax
- durationMinutes

### Booking

- id
- userId
- vehicleId
- garageId
- status
- scheduledAt
- issueNotes
- estimatedPrice

### BookingStatusEvent

- id
- bookingId
- status
- note
- createdAt

### ChatThread

- id
- bookingId
- riderId
- garageId

### ChatMessage

- id
- threadId
- senderId
- type
- content
- attachmentUrl
- createdAt

### Product

- id
- sellerId
- categoryId
- name
- description
- price
- stock

### Order

- id
- buyerId
- sellerId
- totalAmount
- status
- createdAt

### CommunityPost

- id
- authorId
- content
- mediaUrl
- createdAt

### Trip

- id
- creatorId
- title
- startLocation
- endLocation
- startDate

## Modeling Notes

- Use enums for role, booking status, document type, and order status.
- Track timeline events separately for bookings and orders.
- Keep documents, invoices, and approvals auditable.
- Plan for seller and influencer roles as optional profile extensions.
