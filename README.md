# Care.xyz - Baby Sitting & Elderly Care Service Platform

Care.xyz is a modern web application designed to connect families with reliable and trusted caregivers for children, the elderly, and those in need of special care using a secure and accessible platform.

## 🚀 Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Secure Authentication**: 
  - Email/Password login & registration.
  - Google Social Login integration.
  - Route protection via Next.js Middleware.
- **Service Booking System**:
  - Detailed service pages (Baby Care, Elderly Care, Sick Care).
  - Dynamic cost calculation based on duration (Hourly/Daily).
  - Comprehensive location selection (Division, District, City, Area).
- **User Dashboard**:
  - "My Bookings" page to track service status (Pending, Confirmed, Cancelled).
  - Ability to cancel pending bookings.
- **Premium Aesthetics**: Built with Tailwind CSS and Shadcn UI for a polished user experience.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/care-xyz.git
   cd care
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/care

   # Better Auth
   BETTER_AUTH_SECRET=your_super_secret_random_string_at_least_32_chars
   BETTER_AUTH_URL=http://localhost:3000

   # Social Login
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (landing, layout, bookings, ui).
- `src/lib`: Utility functions, database connection, and auth configuration.
- `public/images`: Static assets for banners and services.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
