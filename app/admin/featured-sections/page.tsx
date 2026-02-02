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
import { featuredSectionAPI, FeaturedSection } from '@/lib/api/featuredSections';
import { productAPI } from '@/lib/api/products';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FeaturedSectionsPage() {
  const [sections, setSections] = useState<FeaturedSection[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSectionSheetOpen, setIsSectionSheetOpen] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<FeaturedSection | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    discount: '',
    title: '',
    buttonText: 'Shop now',
    image: '',
    link: '',
    productId: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    loadSections();
    loadProducts();
  }, []);

  const loadSections = async () => {
    try {
      const data = await featuredSectionAPI.getAll();
      setSections(data);
    } catch (error) {
      console.error('Error loading sections:', error);
      toast.error('Failed to load featured sections');
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll({ status: 'published' });
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleCreate = () => {
    setSelectedSection(null);
    setFormData({
      name: '',
      slug: '',
      discount: '',
      title: '',
      buttonText: 'Shop now',
      image: '',
      link: '',
      productId: '',
      isActive: true,
      order: 0,
    });
    setIsSectionSheetOpen(true);
  };

  const handleEdit = (section: FeaturedSection) => {
    setSelectedSection(section);
    setFormData({
      name: section.name,
      slug: section.slug,
      discount: section.discount || '',
      title: section.title,
      buttonText: section.buttonText,
      image: section.image,
      link: section.link,
      productId: section.productId || '',
      isActive: section.isActive,
      order: section.order,
    });
    setIsSectionSheetOpen(true);
  };

  const handleDelete = (section: FeaturedSection) => {
    setSelectedSection(section);
    setIsDeleteSheetOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedSection) {
      try {
        await featuredSectionAPI.delete(selectedSection.id || selectedSection._id);
        toast.success('Featured section deleted successfully');
        loadSections();
      } catch (error) {
        toast.error('Failed to delete featured section');
      }
      setIsDeleteSheetOpen(false);
      setSelectedSection(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
      const submitData = {
        ...formData,
        slug,
        productId: formData.productId === 'none' ? '' : formData.productId,
      };

      if (selectedSection) {
        await featuredSectionAPI.update(selectedSection.id || selectedSection._id, submitData);
        toast.success('Featured section updated successfully');
      } else {
        await featuredSectionAPI.create(submitData);
        toast.success('Featured section created successfully');
      }
      loadSections();
      setIsSectionSheetOpen(false);
      setFormData({
        name: '',
        slug: '',
        discount: '',
        title: '',
        buttonText: 'Shop now',
        image: '',
        link: '',
        productId: '',
        isActive: true,
        order: 0,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to save featured section');
    }
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

    e.target.value = '';
  };

  const removeImage = () => {
    setFormData({ ...formData, image: '' });
  };

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal text-gray-900">Featured Sections</h1>
          <p className="text-gray-600 mt-1">
            Manage Living Room, Dining Room, and other featured sections
          </p>
        </div>
        <Button
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleCreate}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Featured Section
        </Button>
      </div>

      {/* Search */}
      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search featured sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sections Table */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">All Featured Sections</CardTitle>
          <CardDescription>
            {filteredSections.length} {filteredSections.length === 1 ? 'section' : 'sections'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    {searchQuery
                      ? 'No sections match your search'
                      : 'No featured sections yet. Create your first section!'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSections.map((section) => (
                  <TableRow key={section.id || section._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">{section.name}</TableCell>
                    <TableCell className="text-gray-600">{section.title}</TableCell>
                    <TableCell className="text-gray-600">{section.discount || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        section.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {section.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{section.order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(section)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(section)}
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

      {/* Create/Edit Sheet */}
      <Sheet open={isSectionSheetOpen} onOpenChange={setIsSectionSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-[50vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedSection ? 'Edit Featured Section' : 'Create Featured Section'}</SheetTitle>
            <SheetDescription>
              {selectedSection ? 'Update featured section information' : 'Add a new featured section (e.g., Living Room, Dining Room)'}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Section Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Living Room"
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
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Living Room"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount Text</Label>
              <Input
                id="discount"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="e.g., CUSTOM MADE or HANDCRAFTED"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                placeholder="e.g., Shop now"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="e.g., /shop/living-room"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productId">Featured Product (Optional)</Label>
              <Select
                value={formData.productId || 'none'}
                onValueChange={(value) => setFormData({ ...formData, productId: value === 'none' ? '' : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id || product._id} value={product.id || product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Section Image *</Label>
              <input
                id="section-image-upload"
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
                      alt="Section preview"
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
                      const fileInput = document.getElementById('section-image-upload') as HTMLInputElement;
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
                    const fileInput = document.getElementById('section-image-upload') as HTMLInputElement;
                    fileInput?.click();
                  }}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image from Device
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-amber-500 border-gray-300 rounded"
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSectionSheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              >
                {selectedSection ? 'Update Section' : 'Create Section'}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Sheet */}
      <Sheet open={isDeleteSheetOpen} onOpenChange={setIsDeleteSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-[50vw]">
          <SheetHeader>
            <SheetTitle>Delete Featured Section</SheetTitle>
            <SheetDescription>
              Are you sure you want to delete "{selectedSection?.name}"? This action cannot be undone.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 mt-6">
            <div className="p-4 bg-red-50 border border-red-200 ">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> This will permanently delete the featured section. This action cannot be undone.
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
                Delete Section
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

