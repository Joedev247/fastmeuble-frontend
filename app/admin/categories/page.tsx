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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit, Trash2, Search, Upload, X } from 'lucide-react';
import { categoryService, Category } from '@/lib/admin/categories';
import { toast } from 'sonner';
import Image from 'next/image';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const allCategories = await categoryService.getAll();
      setCategories(allCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setFormData({ name: '', slug: '', description: '', image: '' });
    setIsCategorySheetOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.image || '',
    });
    setIsCategorySheetOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteSheetOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCategory) {
      const success = categoryService.delete(selectedCategory.id);
      if (success) {
        toast.success('Category deleted successfully');
        loadCategories();
      } else {
        toast.error('Failed to delete category');
      }
      setIsDeleteSheetOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (selectedCategory) {
      const updated = categoryService.update(selectedCategory.id, {
        name: formData.name,
        slug,
        description: formData.description,
        image: formData.image,
      });
      if (updated) {
        toast.success('Category updated successfully');
        loadCategories();
      } else {
        toast.error('Failed to update category');
      }
    } else {
      const created = categoryService.create({
        name: formData.name,
        slug,
        description: formData.description,
        image: formData.image,
      });
      toast.success('Category created successfully');
      loadCategories();
    }
    
    setIsCategorySheetOpen(false);
    setFormData({ name: '', slug: '', description: '', image: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setFormData({ ...formData, image: imageUrl });
      toast.success('Image uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const removeImage = () => {
    setFormData({ ...formData, image: '' });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Manage product categories
          </p>
        </div>
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleCreate}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              {searchQuery ? 'No categories match your search' : 'No categories yet. Create your first category!'}
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <Card key={category.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                {category.image && (
                  <div className="relative w-full h-48 bg-gray-100  overflow-hidden mb-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardTitle className="text-gray-900">{category.name}</CardTitle>
                <CardDescription>{category.description || 'No description'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Slug: {category.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create/Edit Sheet */}
      <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-[50vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedCategory ? 'Edit Category' : 'Create Category'}</SheetTitle>
            <SheetDescription>
              {selectedCategory ? 'Update category information' : 'Add a new product category'}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Dining Chairs"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Auto-generated from name"
              />
              <p className="text-xs text-gray-500">Leave empty to auto-generate from name</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Category Image</Label>
              <input
                id="category-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {formData.image ? (
                <div className="space-y-2">
                  <div className="relative w-full h-48 bg-gray-100  overflow-hidden border-2 border-gray-200">
                    <Image
                      src={formData.image}
                      alt="Category preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const fileInput = document.getElementById('category-image-upload') as HTMLInputElement;
                      fileInput?.click();
                    }}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const fileInput = document.getElementById('category-image-upload') as HTMLInputElement;
                    fileInput?.click();
                  }}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image from Device
                </Button>
              )}
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCategorySheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              >
                {selectedCategory ? 'Update Category' : 'Create Category'}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Sheet */}
      <Sheet open={isDeleteSheetOpen} onOpenChange={setIsDeleteSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-[50vw]">
          <SheetHeader>
            <SheetTitle>Delete Category</SheetTitle>
            <SheetDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 mt-6">
            <div className="p-4 bg-red-50 border border-red-200 ">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This will permanently delete the category and all associated data. This action cannot be undone.
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
                Delete Category
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
