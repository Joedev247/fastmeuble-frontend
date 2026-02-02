'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import { productService, AdminProduct } from '@/lib/admin/products';
import { toast } from 'sonner';
import Image from 'next/image';
import { ProductFormSheet } from '@/components/admin/ProductFormSheet';
import { formatXAF } from '@/lib/utils/currency';

export default function WorksPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const allProducts = await productService.getAll();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleCreate = () => {
    setEditingProductId(null);
    setIsProductSheetOpen(true);
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProductId(product.id);
    setIsProductSheetOpen(true);
  };

  const handleDelete = (product: AdminProduct) => {
    setSelectedProduct(product);
    setIsDeleteSheetOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        const success = await productService.delete(selectedProduct.id);
        if (success) {
          toast.success('Product deleted successfully');
          loadProducts();
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      } finally {
        setIsDeleteSheetOpen(false);
        setSelectedProduct(null);
      }
    }
  };

  const handleProductSheetSuccess = () => {
    loadProducts();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Products</CardTitle>
          <CardDescription>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'No products match your filters' 
                      : 'No products found. Create your first product!'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={product.mainImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                    <TableCell className="text-gray-600">{product.category}</TableCell>
                    <TableCell className="font-semibold text-amber-500">
                      {formatXAF(product.price)}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        product.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{product.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/shop/${product.id}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Form Sheet */}
      <ProductFormSheet
        open={isProductSheetOpen}
        onOpenChange={setIsProductSheetOpen}
        productId={editingProductId}
        onSuccess={handleProductSheetSuccess}
      />

      {/* Delete Confirmation Sheet */}
      <Sheet open={isDeleteSheetOpen} onOpenChange={setIsDeleteSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-[50vw]">
          <SheetHeader>
            <SheetTitle>Delete Product</SheetTitle>
            <SheetDescription>
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 mt-6">
            <div className="p-4 bg-red-50 border border-red-200 ">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This will permanently delete the product and all associated data. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteSheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmDelete}
              >
                Delete Product
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
