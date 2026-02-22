export interface Food {
    id: string;
    name: string;
    price: number;
    rating: number;
    image: string;
    category: string;
    description: string;
}

export const CATEGORIES = [
    { id: '1', name: 'Pizza', icon: '🍕' },
    { id: '2', name: 'Burgers', icon: '🍔' },
    { id: '3', name: 'Sushi', icon: '🍣' },
    { id: '4', name: 'Salads', icon: '🥗' },
    { id: '5', name: 'Desserts', icon: '🍰' },
];

export const FOODS: Food[] = [
    {
        id: '1',
        name: 'Pepperoni Pizza',
        price: 12.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
        category: 'Pizza',
        description: 'Classic pepperoni pizza with fresh mozzarella and tomato sauce.',
    },
    {
        id: '2',
        name: 'Cheese Burger',
        price: 9.50,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
        category: 'Burgers',
        description: 'Juicy beef patty with melty cheddar cheese and fresh veggies.',
    },
    {
        id: '3',
        name: 'Salmon Sushi',
        price: 15.00,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
        category: 'Sushi',
        description: 'Fresh Atlantic salmon over seasoned sushi rice.',
    },
    {
        id: '4',
        name: 'Caesar Salad',
        price: 8.99,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1550304943-4f27f830c25a?q=80&w=800&auto=format&fit=crop',
        category: 'Salads',
        description: 'Crispy romaine lettuce with parmesan, croutons, and caesar dressing.',
    },
    {
        id: '5',
        name: 'Chocolate Cake',
        price: 6.50,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
        category: 'Desserts',
        description: 'Rich dark chocolate cake with chocolate ganache frosting.',
    },
];
