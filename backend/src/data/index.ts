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
  { name: 'Braking System', img: 'https://images.explore.bike/wp-content/uploads/2021/04/Motorcycle-Braking-System.jpg' }, // Sample, using Unsplash actually
  { name: 'Engine Parts', img: 'https://images.unsplash.com/photo-1610640498870-fb0b5b08ce2a' },
  { name: 'Transmission', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc' },
  { name: 'Electrical & Lights', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763' },
  { name: 'Exhaust', img: 'https://images.unsplash.com/photo-1590204781745-f04b2b6ab0c9' },
  { name: 'Suspension', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc' }
];

const brands = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati', 'BMW', 'Universal'];

const generateProducts = () => {
  const generated = [];
  let partCounter = 1000;

  for (let i = 0; i < 60; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categoriesData[Math.floor(Math.random() * categoriesData.length)];
    
    generated.push({
      name: `${brand} ${category.name} Type-${i % 5 + 1}`,
      description: `Premium durable ${category.name.toLowerCase()} for ${brand} motorcycles. Precision engineered for high performance and reliability.`,
      partNumber: `MP-${brand.substring(0,3).toUpperCase()}-${partCounter++}`,
      price: Number((Math.random() * 200 + 20).toFixed(2)),
      stockCount: Math.floor(Math.random() * 50) + 10,
      imageUrl: `${category.img}?q=80&w=800&auto=format&fit=crop`,
      category: category.name,
      bikeBrand: brand,
    });
  }

  return generated;
};

export const products = generateProducts();
