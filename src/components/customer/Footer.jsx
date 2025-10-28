import React from 'react';
import { Phone, MapPin, Mail, LogIn } from 'lucide-react';

export default function Footer({ onAdminClick }) {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ALFA PETSHOP</h3>
            <p className="text-gray-400">Menyediakan makanan dan kebutuhan hewan peliharaan berkualitas tinggi</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>info@alfapetshop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Bandar Lampung, Indonesia</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
            <div className="text-gray-400 space-y-1">
              <p>Senin - Sabtu: 08.00 - 20.00</p>
              <p>Minggu: 09.00 - 18.00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ALFA PETSHOP. All rights reserved.</p>
          <button
            onClick={onAdminClick}
            className="mt-4 text-sm text-gray-500 hover:text-purple-400 transition-colors flex items-center justify-center mx-auto space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Admin Access</span>
          </button>
        </div>
      </div>
    </footer>
  );
}