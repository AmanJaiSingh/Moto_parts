import bcrypt from 'bcrypt';

export const users = [
  {
    name: 'Admin User',
    email: 'admin@motoparts.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Test Customer',
    email: 'john@example.com',
    passwordHash: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

const categoriesData = [
  { name: 'Braking System', img: 'https://images.unsplash.com/photo-1577717903901-b21a36b9c968?q=80&w=600&auto=format&fit=crop' },
  { name: 'Engine Parts', img: 'https://images.unsplash.com/photo-1610640498870-fb0b5b08ce2a?q=80&w=600&auto=format&fit=crop' },
  { name: 'Transmission', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' },
  { name: 'Electrical & Lights', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=600&auto=format&fit=crop' },
  { name: 'Exhaust', img: 'https://images.unsplash.com/photo-1590204781745-f04b2b6ab0c9?q=80&w=600&auto=format&fit=crop' },
  { name: 'Suspension', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop' }
];

const brands = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati', 'BMW', 'Universal'];

const generateProducts = () => {
  const generated = [];
  let partCounter = 1000;

  for (let i = 0; i < 60; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categoriesData[Math.floor(Math.random() * categoriesData.length)];
    
    generated.push({
      name: `${brand} Compatible ${category.name} Module V${(Math.random() * 10).toFixed(1)}`,
      description: `High-quality ${category.name.toLowerCase()} component. Specially designed to fit ${brand} models. Ensures maximum performance and durability standard for demanding riders.`,
      partNumber: `PT-${brand.substring(0,3).toUpperCase()}-${partCounter++}`,
      price: Number((Math.random() * 150 + 10).toFixed(2)),
      stockCount: Math.floor(Math.random() * 100) + 5,
      imageUrl: category.img,
      category: category.name,
      bikeBrand: brand,
    });
  }

  return generated;
};

export const products = generateProducts();
