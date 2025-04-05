import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-colorSecondary text-white pt-16 lg:px-20 md:px-10 px-5 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/images/logo-prest.svg"
                alt="Prestmit"
                width={150}
                height={30}
                className="invert" // To make the logo white
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Prestmit is a user-centric platform designed for YOU to Buy & Sell Crypto, Gift Cards, Airtime and Utility Bills. You can pay or be paid in Naira, Cedis, Bitcoin, or USDT.
            </p>
            <p className="text-gray-400 mb-2">Live Chat Support is available 24/7.</p>
            <div className="space-y-2">
              <a href="mailto:help@prestmit.io" className="text-blue-400 block hover:underline">help@prestmit.io (Support)</a>
              <a href="mailto:partners@prestmit.io" className="text-blue-400 block hover:underline">partners@prestmit.io (Other Enquiries)</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/airtime-to-cash" className="text-gray-400 hover:text-white">Airtime to Cash</Link></li>
              <li><Link href="/bitcoins" className="text-gray-400 hover:text-white">Sell Bitcoin in Nigeria</Link></li>
              <li><Link href="/bitcoin-ghana-cedis" className="text-gray-400 hover:text-white">Sell Bitcoin in Ghana</Link></li>
              <li><Link href="/usdt" className="text-gray-400 hover:text-white">Tether (USDT) Wallet</Link></li>
              <li><Link href="/buy-cheap-airtime" className="text-gray-400 hover:text-white">Buy Cheap Airtime</Link></li>
              <li><Link href="/buy-cheap-data" className="text-gray-400 hover:text-white">Buy Cheap Data</Link></li>
              <li><Link href="/fund-betting-accounts" className="text-gray-400 hover:text-white">Fund Betting Accounts</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><a href="https://help.prestmit.io/en/" className="text-gray-400 hover:text-white">Support & FAQs</a></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/developers" className="text-gray-400 hover:text-white">Developers</Link></li>
              <li><Link href="/rates" className="text-gray-400 hover:text-white">Gift Card Rates Calculator</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms Of Use</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Gift Cards */}
          <div>
            <h3 className="text-lg font-bold mb-4">Gift Cards</h3>
            <ul className="space-y-3">
              <li><Link href="/sell-gift-card" className="text-gray-400 hover:text-white">Sell Gift Card in Nigeria</Link></li>
              <li><Link href="/gift-cards-ghana-momo-cedis" className="text-gray-400 hover:text-white">Sell Gift Card in Ghana</Link></li>
              <li><Link href="/gift-cards-to-bitcoins" className="text-gray-400 hover:text-white">Gift Card to Bitcoin</Link></li>
              <li><Link href="/gift-cards-to-usdt" className="text-gray-400 hover:text-white">Gift Card to USDT</Link></li>
              <li><Link href="/amazon" className="text-gray-400 hover:text-white">Amazon Gift Card</Link></li>
              <li><Link href="/apple" className="text-gray-400 hover:text-white">Apple Gift Card</Link></li>
              <li><Link href="/google-play" className="text-gray-400 hover:text-white">Google Play Gift Card</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center mt-12 mb-8 space-x-6">
          <a href="https://www.instagram.com/prestmit/" aria-label="Instagram" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/prestmit/" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://www.twitter.com/prestmit/" aria-label="Twitter" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/prestmit/" aria-label="Facebook" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCtfCmHtHdpU0cOW3JY1pnMA" aria-label="YouTube" className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2025 Prestmit. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
