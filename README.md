## ShopCart: E-Commerce Platform

ShopCart is a sleek, production-ready e-commerce frontend built with **Next.js**, **TypeScript**, **React-Redux** and **Redux Toolkit**. It features a clean, responsive design and a fully functional shopping cart and wishlist system, delivering a modern and seamless user experience.

### Hosted Project:

Live Demo: (https://your-live-demo-link.com)[Click Here]

![ShopCart Homepage](https://storage.googleapis.com/studioprod-55291.appspot.com/6c6c5963-718c-4573-8951-6979e953835f/projects/cqjmp7i48i/github_readme_shopcart.png)

### Key Features:

*   **Modern Tech Stack**: Built with Next.js 15 (App Router), React 18, and TypeScript for a type-safe, performant, and scalable application.
*   **Comprehensive E-commerce UI**: Includes a homepage with category highlights, category-specific product listing pages, a shopping cart, and a wishlist.
*   **Dynamic & Responsive Design**: Styled with Tailwind CSS and ShadCN UI components for a polished, responsive user experience that looks great on all devices.
*   **Real-time Cart & Wishlist**: Utilizes Firebase Firestore to persist user cart and wishlist data, even for anonymous users, with real-time updates.
*   **Offline Support**: Stores cart and wishlist data in Redux state to maintain user actions, ensuring a smoother user experience even with intermittent network connectivity.
*   **Light/Dark Mode**: Theme-toggling and persistence with ***next-theme*** across sessions for a polished user experience.

### Features in Action:

- **Add to Cart**:  
  ![Add to Cart](public/add-to-cart.gif)  

- **Add to Wishlist**:  
  ![Wishlist](public/wishlist.gif)  

- **Light/Dark Mode Toggle**:  
  ![Theme Toggle](public/theme-toggle.gif)  

### Tech Stack:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
*   **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
*   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
*   **Product Data**: [DummyJSON API](https://dummyjson.com/)


### State Management: 

*  **Redux Toolkit**: Modern Redux with simplified syntax to manage cart and wishlist states globally, making state updates predictable, easy to debug and scalable.

*  **React Redux**: React bindings for Redux


### UI Components & Libraries:

**UI Components:**

- **[Lucide React](https://lucide.dev/guide/packages/lucide-react)** – Icon library.  
- **[Embla Carousel](https://www.embla-carousel.com/)** – Image/slider carousel.   
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** – Form handling with validation.  
- **[React Day Picker](https://react-day-picker.js.org/)** – Date picker component.  

**Utilities:**
 
- **[date-fns](https://date-fns.org/)** – Date manipulation.  
- **[uuid](https://www.npmjs.com/package/uuid)** – Unique ID generation.  
- **[next-themes](https://github.com/pacocoursey/next-themes)** – Dark/light theme support.


### Getting Started:

<!-- **1. Firebase Setup**

This project requires a Firebase project to handle the cart and wishlist functionality.

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your project, navigate to the **Build** section and click on **Firestore Database**.
3.  Click **Create database** and start in **test mode**. This is crucial for the application to have read/write access.
4.  Go to your Project Settings (click the gear icon) and find your web app's Firebase configuration object.
5.  Copy these credentials into the `.env` file in the root of this project, following the format provided in the file. -->
**Installation & Running Locally**

  Clone the repository and install the dependencies:

```bash
git clone 
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### License: 
This project is licensed under the MIT License