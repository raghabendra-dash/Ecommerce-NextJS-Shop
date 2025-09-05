"use client";

import Link from "next/link";
import { ShoppingBag, User, Building2, Gift, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "../features/slices/authSlice";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const NavLink = ({
  href,
  children,
  onMouseEnter,
}: {
  href: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
}) => (
  <Link
    href={href}
    prefetch={true}
    onMouseEnter={onMouseEnter}
    className="relative text-sm font-medium font-nav text-muted-foreground hover:text-primary transition-colors"
  >
    {children}
  </Link>
);

export function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );
  const animationType = useSelector(
    (state: RootState) => state.cart.animationType
  );
  const wishlistAnimation = useSelector(
    (state: RootState) => state.wishlist.animationType
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [isClient, setIsClient] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);
  const [animateThemeToggle, setAnimateThemeToggle] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setAnimateIcon(true);
    const mainIconTimer = setTimeout(() => setAnimateIcon(false), 800);

    setAnimateThemeToggle(true);
    const themeToggleTimer = setTimeout(
      () => setAnimateThemeToggle(false),
      1000
    );

    return () => {
      clearTimeout(mainIconTimer);
      clearTimeout(themeToggleTimer);
    };
  }, []);

  const handlePrefetch = (path: string) => {
    router.prefetch(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-900 shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 -ml-5 flex items-center space-x-2">
          <Building2
            className={cn("h-7 w-7 text-primary", {
              "animate-drop-bounce": animateIcon,
            })}
            strokeWidth={2.5}
          />
          <span className="font-logo text-2xl sm:inline-block">ShopCart</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-12 ml-52">
          <NavLink href="/" onMouseEnter={() => handlePrefetch("/")}>
            Home
          </NavLink>
          <NavLink
            href="/category/electronics"
            onMouseEnter={() => handlePrefetch("/category/electronics")}
          >
            Electronics
          </NavLink>
          <NavLink
            href="/category/clothing"
            onMouseEnter={() => handlePrefetch("/category/clothing")}
          >
            Fashion
          </NavLink>
          <NavLink
            href="/category/beauty"
            onMouseEnter={() => handlePrefetch("/category/beauty")}
          >
            Beauty
          </NavLink>
          <NavLink
            href="/category/groceries"
            onMouseEnter={() => handlePrefetch("/category/groceries")}
          >
            Groceries
          </NavLink>
          <NavLink
            href="/category/furniture"
            onMouseEnter={() => handlePrefetch("/category/furniture")}
          >
            Furniture
          </NavLink>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 ">
          <nav className="flex items-center space-x-4 ml-48">
            {/* <div className={cn({ "animate-heartbeat": animateThemeToggle })}>
                <ThemeToggle />
            </div> */}
            <ThemeToggle animate={animateThemeToggle} />
            <Link
              href="/wishlist"
              onMouseEnter={() => handlePrefetch("/wishlist")}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Wishlist"
                className="relative text-muted-foreground hover:bg-transparent hover:text-accent"
              >
                <Gift
                  className={cn("h-7 w-7", {
                    "animate-shake": wishlistAnimation === "shake",
                  })}
                />
                {isClient && wishlistCount > 0 && (
                  <Badge
                    className="absolute top-0 right-0 h-5 w-5 p-0 flex items-center justify-center text-sm"
                    variant="default"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart" onMouseEnter={() => handlePrefetch("/cart")}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Shopping Cart"
                className="relative text-muted-foreground hover:bg-transparent hover:text-accent"
              >
                <ShoppingBag
                  className={cn("h-7 w-7", {
                    "animate-shake": animationType === "shake",
                  })}
                />
                {isClient && cartCount > 0 && (
                  <Badge
                    className="absolute top-0 right-0 h-5 w-5 p-0 flex items-center justify-center text-sm"
                    variant="default"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <div
              onMouseEnter={() => {
                handlePrefetch("/signin");
                handlePrefetch("/signup");
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="User Account"
                    className="relative text-muted-foreground hover:bg-transparent hover:text-accent"
                  >
                    <div className="relative">
                      <User className="h-9 w-9" />
                      {isClient && isAuthenticated && (
                        <div className="absolute top-0 right-0 h-4 w-4 -translate-y-1/2 translate-x-1/2">
                          <div className="h-full w-full rounded-md bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="h-9 w-9 text-white text-lg" />
                          </div>
                        </div>
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isAuthenticated ? (
                    <DropdownMenuItem onClick={handleLogout}>
                      Sign Out
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/signin">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/signup">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
// function dispatch(arg0: { payload: undefined; type: "auth/logout"; }) {
//   throw new Error("Function not implemented.");
// }
