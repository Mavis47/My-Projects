import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateProduct() {
    const [productName, setProductName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string>();
    const [category, setCategory] = useState('');
    const [productImage, setProductImage] = useState<File | null>();
    const [quantity, setQuantity] = useState<string>();
    const [shipping, setShipping] = useState<boolean>(false);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target!.files!.length > 0){
            setProductImage(e.target?.files?.[0]);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Product_Image', productImage as File);
        formData.append('Product_name', productName)
        formData.append('Description', description);
        formData.append('Price', price!);
        formData.append('category', category);
        formData.append('quantity', quantity!)
        formData.append('shipping', shipping.toString())

        try {
            const response = await axios.post('http://localhost:7000/api/product/create-product', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success('Product created successfully!');
            // Reset form
            setProductName('');
            setSlug('');
            setDescription('');
            setPrice(0);
            setCategory('');
            setProductImage('');
            setQuantity(0);
            setShipping(false);
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Error creating product');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Create Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter product name"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter product description"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter product price"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Category ID</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter category ID"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Product Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter product image URL"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter product quantity"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={shipping}
                        onChange={(e) => setShipping(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm font-medium">Shipping Available</label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
}
