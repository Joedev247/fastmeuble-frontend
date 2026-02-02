'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import { productService, AdminProduct } from '@/lib/admin/products';
import { categoryService } from '@/lib/admin/categories';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ProductForm() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isEdit = pathname?.includes('/edit');
  const productId = isEdit ? (params?.id as string) : null;

  const [categories, setCategories] = useState<any[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    material: '',
    dimensions: '',
    weight: '',
    color: '',
    mainImage: '/images/category-1.jpg',
    images: ['/images/category-1.jpg'],
    inStock: true,
    isHot: false,
    status: 'draft' as 'published' | 'draft' | 'archived',
  });

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const cats = await categoryService.getAll();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (isEdit && productId) {
        try {
          const product = await productService.getById(productId);
          if (product) {
            setFormData({
              name: product.name,
              category: product.category,
              price: product.price.toString(),
              originalPrice: product.originalPrice?.toString() || '',
              description: product.description,
              material: product.specifications.material,
              dimensions: product.specifications.dimensions,
              weight: product.specifications.weight,
              color: product.specifications.color,
              mainImage: product.mainImage,
              images: product.images,
              inStock: product.inStock,
              isHot: product.isHot || false,
              status: product.status,
            });
          }
        } catch (error) {
          console.error('Error loading product:', error);
        }
      }
    };

    loadProduct();
  }, [isEdit, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        specifications: {
          material: formData.material,
          dimensions: formData.dimensions,
          weight: formData.weight,
          color: formData.color,
        },
        images: formData.images,
        mainImage: formData.mainImage,
        rating: 0,
        reviews: 0,
        inStock: formData.inStock,
        isHot: formData.isHot,
        discount: formData.originalPrice 
          ? `${Math.round((1 - parseFloat(formData.price) / parseFloat(formData.originalPrice)) * 100)}%`
          : undefined,
        status: formData.status,
      };

      if (isEdit && productId) {
        const updated = await productService.update(productId, productData as Partial<AdminProduct>);
        if (updated) {
          toast.success('Product updated successfully!');
          router.push('/admin/works');
        } else {
          toast.error('Failed to update product');
        }
      } else {
        const created = await productService.create(productData);
        toast.success('Product created successfully!');
        router.push('/admin/works');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          setFormData({
            ...formData,
            images: [...formData.images, imageUrl],
            mainImage: formData.images.length === 0 ? imageUrl : formData.mainImage,
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select a valid image file');
      }
    });

    // Reset input
    e.target.value = '';
  };

  const addImage = () => {
    // Trigger file input click
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
      mainImage: index === 0 && formData.images.length > 1 
        ? formData.images[1] 
        : formData.mainImage,
    });
  };

  const setMainImage = (image: string) => {
    setFormData({ ...formData, mainImage: image });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/works">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-normal text-gray-900">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? 'Update product information' : 'Create a new product for your store'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription>Product name, category, and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                      disabled={isLoadingCategories}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingCategories ? (
                          <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                        ) : categories.length === 0 ? (
                          <SelectItem value="no-categories" disabled>No categories available</SelectItem>
                        ) : (
                          categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'published' | 'draft' | 'archived') => 
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (FCFA) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (FCFA)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Description</CardTitle>
                <CardDescription>Product description and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Specifications</CardTitle>
                <CardDescription>Product specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material">Material *</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      placeholder="e.g., Wood & Fabric"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions *</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      placeholder="e.g., 45cm x 50cm x 90cm"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight *</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="e.g., 8kg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color *</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="e.g., Grey"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Product Images</CardTitle>
                <CardDescription>Upload product images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="grid grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className={`relative aspect-square bg-gray-100  overflow-hidden border-2 ${
                        formData.mainImage === image ? 'border-amber-500' : 'border-gray-200'
                      }`}>
                        <Image
                          src={image}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 20vw"
                        />
                        {formData.mainImage === image && (
                          <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {formData.mainImage !== image && (
                          <button
                            type="button"
                            onClick={() => setMainImage(image)}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Set Main
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={addImage}>
                  + Upload Image from Device
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock">In Stock</Label>
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isHot">Hot Product</Label>
                  <input
                    type="checkbox"
                    id="isHot"
                    checked={formData.isHot}
                    onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                    className="w-4 h-4 text-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div className="pt-4 border-t">
                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
