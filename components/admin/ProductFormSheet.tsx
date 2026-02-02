'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Save, X } from 'lucide-react';
import { productService, AdminProduct } from '@/lib/admin/products';
import { categoryService } from '@/lib/admin/categories';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProductFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: string | null;
  onSuccess?: () => void;
}

export function ProductFormSheet({ open, onOpenChange, productId, onSuccess }: ProductFormSheetProps) {
  const router = useRouter();
  const isEdit = !!productId;
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
        toast.error('Failed to load categories');
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (open) {
      loadCategories();
    }
  }, [open]);

  useEffect(() => {
    const loadProduct = async () => {
      if (isEdit && productId && open) {
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
          toast.error('Failed to load product');
        }
      } else if (!isEdit && open) {
        // Reset form for new product
        setFormData({
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
          status: 'draft',
        });
      }
    };

    loadProduct();
  }, [isEdit, productId, open]);

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
          onOpenChange(false);
          onSuccess?.();
        } else {
          toast.error('Failed to update product');
        }
      } else {
        const created = await productService.create(productData);
        toast.success('Product created successfully!');
        onOpenChange(false);
        onSuccess?.();
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentImageCount = formData.images.length;
    const filesToAdd = Array.from(files);
    const maxImages = 9;
    const remainingSlots = maxImages - currentImageCount;

    if (currentImageCount >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      e.target.value = '';
      return;
    }

    const filesToProcess = filesToAdd.slice(0, remainingSlots);
    if (filesToAdd.length > remainingSlots) {
      toast.warning(`Only ${remainingSlots} more image(s) can be added (max ${maxImages})`);
    }

    // Filter valid image files
    const validImageFiles = filesToProcess.filter(file => file.type.startsWith('image/'));
    if (validImageFiles.length !== filesToProcess.length) {
      toast.error('Some files are not valid images');
    }

    if (validImageFiles.length === 0) {
      e.target.value = '';
      return;
    }

    // Process all files in parallel and wait for all to complete
    const imagePromises = validImageFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsDataURL(file);
      });
    });

    try {
      const newImageUrls = await Promise.all(imagePromises);
      
      // Update state once with all new images
      setFormData((prevData) => {
        const updatedImages = [...prevData.images, ...newImageUrls];
        return {
          ...prevData,
          images: updatedImages,
          mainImage: prevData.images.length === 0 ? newImageUrls[0] : prevData.mainImage,
        };
      });

      toast.success(`${newImageUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error('Failed to upload some images');
    }

    // Reset input
    e.target.value = '';
  };

  const addImage = () => {
    const fileInput = document.getElementById('image-upload-sheet') as HTMLInputElement;
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</SheetTitle>
          <SheetDescription>
            {isEdit ? 'Update product information' : 'Create a new product for your store'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="space-y-4">
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
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
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
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
            <div className="space-y-4">
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
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
            <input
              id="image-upload-sheet"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="grid grid-cols-3 gap-3">
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
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                    {formData.mainImage === image && (
                      <div className="absolute top-1 left-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded">
                        Main
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {formData.mainImage !== image && (
                      <button
                        type="button"
                        onClick={() => setMainImage(image)}
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Set Main
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {formData.images.length} / 9 images
              </p>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addImage} 
                disabled={formData.images.length >= 9}
                className={formData.images.length >= 9 ? 'opacity-50 cursor-not-allowed' : ''}
              >
                + Upload Image from Device
              </Button>
            </div>
          </div>

          {/* Publish Options */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Publish Options</h3>
            <div className="space-y-3">
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              disabled={isLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
