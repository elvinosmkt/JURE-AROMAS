
import { Product, Order, Customer, Coupon } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'figo-1',
    name: 'Figo do Oriente',
    category: 'Home Spray',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1620610509141-94578b943261?q=80&w=1000', // Referência à imagem do Figo
    description: 'Doçura aveludada combinada com o frescor das folhas verdes e a profundidade do figo maduro.',
    notes: { top: 'Frutas Vermelhas', heart: 'Figo Maduro', base: 'Baunilha' },
    intensity: 4,
    stock: 25,
    sku: 'SPR-FIG-150',
    profile: 'Floral',
    tags: ['Best Seller']
  },
  {
    id: 'coco-1',
    name: 'Brisa de Coco',
    category: 'Difusores',
    price: 175.00,
    image: 'https://images.unsplash.com/photo-1596435767170-87428867a5b3?q=80&w=1000', // Referência à imagem do Coco na praia
    description: 'O frescor tropical de uma tarde ensolarada à beira-mar com notas cremosas de coco.',
    notes: { top: 'Água de Coco', heart: 'Gardênia', base: 'Sândalo' },
    intensity: 3,
    stock: 60,
    sku: 'DIF-COC-250',
    profile: 'Fresco',
    tags: ['Verão']
  },
  {
    id: 'bambu-1',
    name: 'Bambu Imperial',
    category: 'Difusores',
    price: 165.90,
    image: 'https://images.unsplash.com/photo-1542361345-89e5824b9923?q=80&w=1000', // Referência à imagem do Bambu
    description: 'Serenidade e equilíbrio através das notas verdes e purificantes do bambu amazônico.',
    notes: { top: 'Bambu', heart: 'Folhas Verdes', base: 'Almíscar' },
    intensity: 2,
    stock: 80,
    sku: 'DIF-BAM-250',
    profile: 'Fresco',
    tags: ['Zen']
  },
  {
    id: 'alecrim-1',
    name: 'Sol de Alecrim',
    category: 'Home Spray',
    price: 155.00,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=1000', // Referência à imagem do Alecrim no sol
    description: 'Revigorante e estimulante, perfeito para trazer clareza mental e energia ao ambiente.',
    notes: { top: 'Alecrim', heart: 'Limão Siciliano', base: 'Salva' },
    intensity: 4,
    stock: 45,
    sku: 'SPR-ALE-150',
    profile: 'Cítrico',
    tags: ['Vitalidade']
  },
  {
    id: 'canela-1',
    name: 'Canela e Especiarias',
    category: 'Velas',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000', // Referência à imagem da Canela
    description: 'Um abraço quente e aconchegante com o toque picante e clássico da canela em pau.',
    notes: { top: 'Maçã', heart: 'Canela em Pau', base: 'Cravo' },
    intensity: 5,
    stock: 30,
    sku: 'VLA-CAN-200',
    profile: 'Terroso',
    tags: ['Inverno']
  },
  {
    id: 'forest-1',
    name: 'Calor da Terra',
    category: 'Home Spray',
    price: 178.00,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000', // Referência à imagem da Floresta
    description: 'A força das raízes e o conforto envolvente do solo fértil e madeiras nobres.',
    notes: { top: 'Pimenta Rosa', heart: 'Cedro', base: 'Patchouli' },
    intensity: 5,
    stock: 15,
    sku: 'SPR-FOR-150',
    profile: 'Terroso',
    tags: ['Ancestral']
  }
];

export const MOCK_ORDERS: Order[] = [];
export const MOCK_CUSTOMERS: Customer[] = [];
export const MOCK_COUPONS: Coupon[] = [];
