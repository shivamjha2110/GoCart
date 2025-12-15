# 🛒 GoToCart - Multi-Vendor E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, featuring multi-vendor support, real-time inventory management, secure payments, and AI-powered product descriptions.

![GoToCart](https://img.shields.io/badge/GoToCart-E--Commerce-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.3.6-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square)
![Prisma](https://img.shields.io/badge/Prisma-6.14.0-green?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=flat-square)

## 🌟 Features

### 🛍️ Core E-commerce Features
- **Multi-Vendor Marketplace**: Sellers can create and manage their own stores
- **Product Management**: Add, edit, and manage products with images and descriptions
- **Shopping Cart**: Persistent cart with Redux state management
- **Order Management**: Complete order lifecycle from placement to delivery
- **User Authentication**: Secure authentication with Clerk
- **Payment Integration**: Stripe payment processing
- **Real-time Updates**: Live inventory and order status updates

### 🤖 AI-Powered Features
- **Smart Product Descriptions**: AI-generated product descriptions using OpenAI
- **Intelligent Categorization**: Automatic product categorization
- **Content Generation**: AI-assisted content creation for sellers

### 📊 Analytics & Dashboard
- **Seller Dashboard**: Comprehensive analytics for store owners
- **Admin Panel**: Full administrative control over the platform
- **Order Analytics**: Detailed order and revenue insights
- **Customer Insights**: User behavior and purchase patterns

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion animations
- **Dark/Light Mode**: Theme switching capability
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Redux Toolkit** - State management
- **Lucide React** - Icon library

### Backend & Database
- **Next.js API Routes** - Server-side API endpoints
- **Prisma ORM** - Database ORM with type safety
- **PostgreSQL** - Primary database
- **Neon Database** - Serverless PostgreSQL

### Authentication & Payments
- **Clerk** - User authentication and management
- **Stripe** - Payment processing
- **Inngest** - Background job processing

### Media & AI
- **ImageKit** - Image optimization and delivery
- **OpenAI** - AI-powered content generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)
- Stripe account for payments
- Clerk account for authentication
- ImageKit account for image management
- OpenAI API key for AI features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gotocart.git
   cd gotocart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/gotocart"
   DIRECT_URL="postgresql://username:password@localhost:5432/gotocart"

   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Payments (Stripe)
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # Media (ImageKit)
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   # AI (OpenAI)
   OPENAI_API_KEY=your_openai_api_key

   # Currency
   NEXT_PUBLIC_CURRENCY_SYMBOL='$'

   # Admin
   ADMIN_EMAIL=your_admin_email@example.com
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client (runs automatically)

## 🌐 API Endpoints

### Authentication
- `GET /api/auth/*` - Clerk authentication routes

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (sellers only)
- `PUT /api/products/[id]` - Update product (sellers only)
- `DELETE /api/products/[id]` - Delete product (sellers only)

### Stores
- `GET /api/store/dashboard` - Get store dashboard data
- `POST /api/store/create` - Create new store
- `GET /api/store/[username]` - Get store by username

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Clear cart

### Payments
- `POST /api/stripe` - Create payment intent

## 🔐 User Roles

### Customer
- Browse products and stores
- Add items to cart
- Place orders
- Leave reviews and ratings
- Track order status

### Seller
- Create and manage store
- Add and manage products
- View sales analytics
- Manage orders
- Update inventory

### Admin
- Manage all users and stores
- Approve/reject store applications
- View platform analytics
- Manage coupons and discounts
- System configuration

## 🎨 Customization

### Currency
Change the currency symbol in `.env`:
```env
NEXT_PUBLIC_CURRENCY_SYMBOL='$'
```

### Theme
The app uses Tailwind CSS for styling. Customize colors and themes in `tailwind.config.js`.

### Features
Enable/disable features by modifying environment variables or component logic.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Ensure all environment variables are set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Database ORM
- [Clerk](https://clerk.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://framer.com/motion) - Animation library

## 📞 Support

For support, email jha.shivam0024@gamil.com

---

**Made with ❤️ for the e-commerce community**
