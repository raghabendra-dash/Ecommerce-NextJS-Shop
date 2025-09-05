"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Footer() {
  const year = new Date().getFullYear();
  const [animateIcon, setAnimateIcon] = useState(false);

  useEffect(() => {
    setAnimateIcon(true);
    const timer = setTimeout(() => setAnimateIcon(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="h-7 w-7 text-primary" strokeWidth={2.5} />
              <span className="font-logo text-2xl text-white sm:inline-block">
                ShopCart
              </span>
            </Link>
            <p className="text-sm">
              123 Dhanupali, Sambalpur,
              <br /> Odisha, IN 768005
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/clothing" className="hover:text-white">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="hover:text-white">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="hover:text-white">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="/category/furniture" className="hover:text-white">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/category/groceries" className="hover:text-white">
                  Groceries
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex justify-center items-center text-sm">
          <p>&copy; {year} ShopCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
