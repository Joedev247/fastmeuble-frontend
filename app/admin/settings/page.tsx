'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Store Information
    storeName: 'Fast Meuble',
    storeDescription: 'Crafting excellence in custom furniture. Located in Bepanda carrefour mala (bepanda manoua voyage), Douala, Cameroon.',
    address: 'Bepanda carrefour mala (bepanda manoua voyage), Douala, Cameroon',
    phone: '+237 654 366 920',
    email: 'info@fastmeuble.com',
    website: 'https://fastmeuble.com',
    
    // Business Hours
    businessHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    
    // Social Media
    facebook: 'https://facebook.com/fastmeuble',
    instagram: 'https://instagram.com/fastmeuble',
    twitter: 'https://twitter.com/fastmeuble',
    whatsapp: '237654366920',
    
    // Payment
    mobileMoney: true,
    cashOnDelivery: true,
    cardPayment: false,
    
    // Shipping
    freeShippingThreshold: '100',
    shippingRate: '0',
    
    // General
    currency: 'XAF',
    language: 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save settings to backend
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-normal text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your store settings and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Store Information */}
        <Card className="border border-gray-200 mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              Store Information
            </CardTitle>
            <CardDescription>Basic store details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name *</Label>
              <Input
                id="storeName"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                value={settings.storeDescription}
                onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address *
                </Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={settings.website}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessHours">Business Hours</Label>
              <Input
                id="businessHours"
                value={settings.businessHours}
                onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="border border-gray-200 mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900">Social Media</CardTitle>
            <CardDescription>Your social media links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={settings.facebook}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={settings.twitter}
                  onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  placeholder="237XXXXXXXXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border border-gray-200 mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900">Payment Methods</CardTitle>
            <CardDescription>Enable or disable payment options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mobileMoney">Mobile Money</Label>
                <p className="text-sm text-gray-500">MTN Mobile Money, Orange Money</p>
              </div>
              <input
                type="checkbox"
                id="mobileMoney"
                checked={settings.mobileMoney}
                onChange={(e) => setSettings({ ...settings, mobileMoney: e.target.checked })}
                className="w-4 h-4 text-amber-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="cashOnDelivery">Cash on Delivery</Label>
                <p className="text-sm text-gray-500">Pay when you receive your order</p>
              </div>
              <input
                type="checkbox"
                id="cashOnDelivery"
                checked={settings.cashOnDelivery}
                onChange={(e) => setSettings({ ...settings, cashOnDelivery: e.target.checked })}
                className="w-4 h-4 text-amber-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="cardPayment">Credit/Debit Card</Label>
                <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
              </div>
              <input
                type="checkbox"
                id="cardPayment"
                checked={settings.cardPayment}
                onChange={(e) => setSettings({ ...settings, cardPayment: e.target.checked })}
                className="w-4 h-4 text-amber-500 border-gray-300 rounded"
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping */}
        <Card className="border border-gray-200 mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900">Shipping Settings</CardTitle>
            <CardDescription>Configure shipping options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                />
                <p className="text-xs text-gray-500">Orders above this amount get free shipping</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingRate">Shipping Rate ($)</Label>
                <Input
                  id="shippingRate"
                  type="number"
                  value={settings.shippingRate}
                  onChange={(e) => setSettings({ ...settings, shippingRate: e.target.value })}
                />
                <p className="text-xs text-gray-500">Standard shipping rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
