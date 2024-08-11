# NestJS Authentication Starter

This repository is a starter project for implementing authentication in a NestJS application using MongoDB. It includes user registration, login, password reset, and email confirmation with JWT-based authentication.

## Features

- **User Registration:** Register new users with email and password.
- **User Login:** Authenticate users and issue JWT tokens.
- **Password Reset:** Generate and validate password reset tokens.
- **Email Confirmation:** Send confirmation emails and validate tokens.
- **JWT Authentication:** Protect routes using JWT tokens.

## Technologies Used

- [NestJS](https://nestjs.com/) - A progressive Node.js framework.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication.
- [Passport](http://www.passportjs.org/) - Middleware for authentication.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: Install MongoDB locally or use a cloud service like MongoDB Atlas.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nestjs-auth-starter.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd nestjs-auth-starter
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Configuration

1. **Create a `.env` file** in the root of your project and add the following environment variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-jwt-secret
   EMAIL_SERVICE=your-email-service
   EMAIL_USER=your-email-address
   EMAIL_PASS=your-email-password
   ```

   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Secret key for signing JWT tokens.
   - `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`: Email configuration for sending confirmation and reset emails.

2. **Update the `main.ts` file** to set up Swagger for API documentation (if not already done):

   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     const config = new DocumentBuilder()
       .setTitle('NestJS Authentication Starter')
       .setDescription('API documentation for NestJS authentication')
       .setVersion('1.0')
       .addBearerAuth()
       .build();

     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api', app, document);

     await app.listen(3000);
   }
   bootstrap();
   ```

### Running the Application

1. **Start the application:**

   ```bash
   npm run start
   ```

   or

   ```bash
   yarn start
   ```

2. **Access the application:**

   - API: `http://localhost:3000/`
   - Swagger Documentation: `http://localhost:3000/api`

### API Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login a user and receive a JWT token.
- **POST /auth/reset-password**: Request a password reset.
- **GET /auth/confirm-email**: Confirm a user's email.

### Folder Structure

```
nestjs-auth-starter/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   ├── reset-password.dto.ts
│   ├── users/
│   │   ├── user.schema.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   ├── app.module.ts
│   ├── main.ts
├── .env
├── package.json
├── README.md
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the MIT License.

---

### Final Steps

- Replace `"your-username"` in the clone command with your actual GitHub username.
- Customize the instructions and configuration details to suit your specific setup or preferences.

By including this `README.md` file in your repository, users and developers will have an easier time getting started with your NestJS authentication project.
