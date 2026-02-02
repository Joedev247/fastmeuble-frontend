'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Package, ShoppingCart, DollarSign, TrendingUp, Users, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { productService } from '@/lib/admin/products';
import { orderService } from '@/lib/admin/orders';
import { categoryService } from '@/lib/admin/categories';
import { AdminProduct } from '@/lib/admin/products';
import { AdminOrder } from '@/lib/admin/orders';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { SalesChart } from '@/components/admin/SalesChart';
import { ProductFormSheet } from '@/components/admin/ProductFormSheet';
import { formatXAF } from '@/lib/utils/currency';

export default function AdminDashboard() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [productStats, setProductStats] = useState({ total: 0, published: 0, drafts: 0, totalValue: 0 });
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    totalRevenue: 0,
  });
  const [categoryCount, setCategoryCount] = useState(0);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);

  useEffect(() => {
    // Load data
    const loadData = async () => {
      try {
        const allProducts = await productService.getAll();
        const allOrders = await orderService.getAll();
        const pStats = await productService.getStats();
        const oStats = await orderService.getStats();
        const categories = await categoryService.getAll();

        setProducts(allProducts.slice(0, 5)); // Recent 5 products
        setOrders(allOrders.slice(0, 5)); // Recent 5 orders
        setProductStats(pStats);
        setOrderStats({
          total: oStats.total,
          pending: oStats.pending,
          totalRevenue: oStats.totalRevenue,
        });
        setCategoryCount(categories.length);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <Button 
          onClick={() => setIsProductSheetOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-normal text-gray-900">{productStats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              {productStats.published} published, {productStats.drafts} drafts
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-normal text-gray-900">{orderStats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              {orderStats.pending} pending orders
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-normal text-gray-900">
              {formatXAF(orderStats.totalRevenue)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              All time revenue
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Categories
            </CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-normal text-gray-900">
              {categoryCount}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Active categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <SalesChart />

      {/* Recent Orders and Products */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900">Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No orders yet
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                          <p className="text-xs text-gray-500">{order.createdAt}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-amber-500">
                        {formatXAF(order.total)}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900">Recent Products</CardTitle>
                <CardDescription>Latest added products</CardDescription>
              </div>
              <Link href="/admin/works">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No products yet. Add your first product!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={product.mainImage}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-400">{product.createdAt}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {product.category}
                      </TableCell>
                      <TableCell className="font-semibold text-amber-500">
                        {formatXAF(product.price)}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          product.status === 'published' ? 'bg-green-100 text-green-800' :
                          product.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Form Sheet */}
      <ProductFormSheet
        open={isProductSheetOpen}
        onOpenChange={setIsProductSheetOpen}
        productId={null}
        onSuccess={async () => {
          // Reload data
          try {
            const allProducts = await productService.getAll();
            const allOrders = await orderService.getAll();
            const pStats = await productService.getStats();
            const oStats = await orderService.getStats();
            const categories = await categoryService.getAll();

            setProducts(allProducts.slice(0, 5));
            setOrders(allOrders.slice(0, 5));
            setProductStats(pStats);
            setOrderStats({
              total: oStats.total,
              pending: oStats.pending,
              totalRevenue: oStats.totalRevenue,
            });
            setCategoryCount(categories.length);
          } catch (error) {
            console.error('Error reloading data:', error);
          }
        }}
      />
    </div>
  );
}
