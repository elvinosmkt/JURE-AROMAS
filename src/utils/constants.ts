
import { Product, Order, Customer, Coupon } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'figo-1',
    name: 'Figo do Oriente',
    category: 'Home Spray',
    price: 189.90,
    image: '/img/figo.png',
    description: 'Uma jornada sensorial que transporta você para os jardins exuberantes do Mediterrâneo. A doçura aveludada do figo maduro se entrelaça com o frescor vibrante das folhas verdes, criando uma experiência aromática sofisticada e envolvente. Perfeito para ambientes que buscam elegância e acolhimento.',
    notes: { top: 'Frutas Vermelhas, Folhas de Figueira', heart: 'Figo Maduro, Leite de Coco', base: 'Baunilha, Almíscar Branco' },
    intensity: 4,
    stock: 25,
    sku: 'SPR-FIG-150',
    profile: 'Floral',
    tags: ['Best Seller', 'Sofisticado']
  },
  {
    id: 'coco-1',
    name: 'Brisa de Coco',
    category: 'Difusores',
    price: 175.00,
    image: '/img/coco.png',
    description: 'Feche os olhos e sinta a brisa tropical acariciar seu rosto. Esta fragrância captura a essência de uma tarde perfeita à beira-mar, onde o aroma cremoso do coco fresco se mistura com flores brancas e madeiras suaves. Uma escapada sensorial para o paraíso, trazendo leveza e frescor para qualquer ambiente.',
    notes: { top: 'Água de Coco, Bergamota', heart: 'Gardênia, Flor de Tiaré', base: 'Sândalo, Almíscar Marinho' },
    intensity: 3,
    stock: 60,
    sku: 'DIF-COC-250',
    profile: 'Fresco',
    tags: ['Verão', 'Tropical']
  },
  {
    id: 'bambu-1',
    name: 'Bambu Imperial',
    category: 'Difusores',
    price: 165.90,
    image: '/img/bambu.jpg',
    description: 'Inspire serenidade e encontre seu centro com esta fragrância zen inspirada nas florestas de bambu da Amazônia. Notas verdes e aquáticas criam uma atmosfera de paz e equilíbrio, perfeita para momentos de meditação, yoga ou simplesmente para transformar sua casa em um santuário de tranquilidade.',
    notes: { top: 'Bambu Verde, Chá Branco', heart: 'Folhas Verdes, Lírio do Vale', base: 'Almíscar, Madeira de Cedro' },
    intensity: 2,
    stock: 80,
    sku: 'DIF-BAM-250',
    profile: 'Fresco',
    tags: ['Zen', 'Relaxante']
  },
  {
    id: 'alecrim-1',
    name: 'Sol de Alecrim',
    category: 'Home Spray',
    price: 155.00,
    image: '/img/alecrim.png',
    description: 'Desperte seus sentidos com a energia revitalizante do alecrim banhado pelo sol. Esta fragrância herbácea e cítrica traz clareza mental, foco e vitalidade para o seu dia. Ideal para home offices, estudos ou qualquer espaço que precise de um impulso de energia positiva e concentração.',
    notes: { top: 'Alecrim Fresco, Limão Siciliano', heart: 'Hortelã, Eucalipto', base: 'Sálvia, Vetiver' },
    intensity: 4,
    stock: 45,
    sku: 'SPR-ALE-150',
    profile: 'Cítrico',
    tags: ['Vitalidade', 'Energizante']
  },
  {
    id: 'canela-1',
    name: 'Canela e Especiarias',
    category: 'Velas',
    price: 195.00,
    image: '/img/canela.png',
    description: 'Envolva-se no abraço caloroso desta fragrância que evoca memórias de tardes aconchegantes e celebrações em família. A canela em pau se une a especiarias aromáticas e frutas assadas, criando uma atmosfera de conforto e sofisticação. Perfeita para noites frias e momentos de introspecção.',
    notes: { top: 'Maçã Assada, Noz-Moscada', heart: 'Canela em Pau, Cravo da Índia', base: 'Baunilha Bourbon, Âmbar' },
    intensity: 5,
    stock: 30,
    sku: 'VLA-CAN-200',
    profile: 'Terroso',
    tags: ['Inverno', 'Aconchegante']
  },
  {
    id: 'forest-1',
    name: 'Calor da Terra',
    category: 'Home Spray',
    price: 178.00,
    image: '/img/floresta.jpg',
    description: 'Conecte-se com a força ancestral da terra através desta fragrância profunda e envolvente. Inspirada no solo fértil da floresta amazônica, combina madeiras nobres, raízes e especiarias para criar uma experiência olfativa que é ao mesmo tempo poderosa e reconfortante. Uma celebração da natureza em sua forma mais pura.',
    notes: { top: 'Pimenta Rosa, Gengibre', heart: 'Cedro do Atlas, Vetiver', base: 'Patchouli, Musgo de Carvalho' },
    intensity: 5,
    stock: 15,
    sku: 'SPR-FOR-150',
    profile: 'Terroso',
    tags: ['Ancestral', 'Amadeirado']
  }
];

// --- MOCK DATA FOR ADMIN PANEL ---

export const MOCK_ORDERS: Order[] = [
  {
    id: '#JR-8901',
    date: '24 Mai 2024, 14:22',
    status: 'Entregue',
    customerName: 'Mariana Vasconcelos',
    customerId: 'cust-001',
    items: [
      {
        productId: 'figo-1',
        name: 'Vela Figo do Oriente',
        quantity: 1,
        price: 189.90,
        image: 'https://images.unsplash.com/photo-1620610509141-94578b943261?q=80&w=200'
      },
      {
        productId: 'home-spray-1',
        name: 'Home Spray Capim-Limão',
        quantity: 2,
        price: 78.00,
        image: 'https://images.unsplash.com/photo-1596435767170-87428867a5b3?q=80&w=200'
      }
    ],
    subtotal: 345.90,
    shipping: 0,
    tax: 0,
    total: 345.90,
    shippingMethod: 'Sedex Grátis',
    trackingCode: 'BR123456789PT',
    shippingAddress: 'Rua das Flores, 123 - Jardins, São Paulo - SP',
    notes: 'Cliente VIP, enviar amostra grátis de Lavanda.',
    timeline: [
      { date: '24 Mai, 14:22', status: 'Pagamento Confirmado', completed: true },
      { date: '24 Mai, 16:00', status: 'Em Preparação', completed: true },
      { date: '25 Mai, 09:30', status: 'Despachado', completed: true },
      { date: '27 Mai, 11:15', status: 'Entregue', completed: true }
    ]
  },
  {
    id: '#JR-8900',
    date: '24 Mai 2024, 13:45',
    status: 'Em Trânsito',
    customerName: 'Ricardo Albuquerque',
    customerId: 'cust-002',
    items: [
      {
        productId: 'difusor-1',
        name: 'Difusor Bambu Imperial',
        quantity: 2,
        price: 256.00,
        image: 'https://images.unsplash.com/photo-1542361345-89e5824b9923?q=80&w=200'
      }
    ],
    subtotal: 512.00,
    shipping: 0,
    tax: 0,
    total: 512.00,
    shippingMethod: 'Transportadora Express',
    trackingCode: 'TR987654321BR',
    shippingAddress: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    timeline: [
      { date: '24 Mai, 13:45', status: 'Pagamento Confirmado', completed: true },
      { date: '24 Mai, 15:00', status: 'Em Preparação', completed: true },
      { date: '25 Mai, 10:00', status: 'Despachado', completed: true },
      { date: '-', status: 'Entregue', completed: false }
    ]
  },
  {
    id: '#JR-8899',
    date: '24 Mai 2024, 11:10',
    status: 'Pendente',
    customerName: 'Helena Martins',
    customerId: 'cust-003',
    items: [{ productId: 'vela-canela-1', name: 'Vela Canela', quantity: 1, price: 189.90, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200' }],
    subtotal: 189.90,
    shipping: 25.00,
    tax: 0,
    total: 214.90,
    shippingMethod: 'PAC',
    shippingAddress: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
    timeline: [
      { date: '24 Mai, 11:10', status: 'Pedido Criado', completed: true },
      { date: '-', status: 'Pagamento', completed: false }
    ]
  },
  {
    id: '#JR-8898',
    date: '23 Mai 2024, 18:30',
    status: 'Preparando',
    customerName: 'Arthur Queiroz',
    customerId: 'cust-004',
    items: [
      { productId: 'kit-1', name: 'Kit Essencial (3 Velas)', quantity: 2, price: 600.00, image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=200' }
    ],
    subtotal: 1200.00,
    shipping: 0,
    tax: 0,
    total: 1200.00,
    shippingMethod: 'Sedex Grátis',
    shippingAddress: 'Rua Oscar Freire, 200 - Jardins, São Paulo - SP',
    timeline: [
      { date: '23 Mai, 18:30', status: 'Pagamento Confirmado', completed: true },
      { date: '24 Mai, 09:00', status: 'Em Preparação', completed: true },
      { date: '-', status: 'Despachado', completed: false }
    ]
  },
  {
    id: '#JR-8897',
    date: '22 Mai 2024, 15:20',
    status: 'Cancelado',
    customerName: 'Luciana Lima',
    customerId: 'cust-005',
    items: [{ productId: 'refil-1', name: 'Refil Difusor', quantity: 3, price: 89.90, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=200' }],
    subtotal: 269.70,
    shipping: 15.00,
    tax: 0,
    total: 284.70,
    shippingMethod: 'PAC',
    shippingAddress: 'Rua da Consolação, 100 - Centro, São Paulo - SP',
    timeline: [
      { date: '22 Mai, 15:20', status: 'Pedido Criado', completed: true },
      { date: '22 Mai, 16:00', status: 'Cancelado pelo Cliente', completed: true }
    ]
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Beatriz Oliveira', email: 'beatriz.oli@email.com', phone: '11999999999', ordersCount: 12, totalSpent: 1240.00, status: 'Ativo', lastPurchase: '12 Out, 2023', tier: 'VIP Gold' },
  { id: '2', name: 'Ricardo Santos', email: 'r.santos@provedor.com.br', phone: '11988888888', ordersCount: 5, totalSpent: 890.50, status: 'Ativo', lastPurchase: '05 Set, 2023', tier: 'Standard' },
  { id: '3', name: 'Helena Martins', email: 'helena.martins@web.com', phone: '11977777777', ordersCount: 2, totalSpent: 420.00, status: 'Inativo', lastPurchase: '15 Jan, 2023', tier: 'Standard' },
  { id: '4', name: 'Gabriel Costa', email: 'g.costa@techmail.com', phone: '11966666666', ordersCount: 8, totalSpent: 2150.00, status: 'Ativo', lastPurchase: '28 Out, 2023', tier: 'VIP Platinum' },
];

export const MOCK_COUPONS: Coupon[] = [
  { id: '1', code: 'JURE10', type: 'Percentage', value: 10, usageCount: 45, usageLimit: 100, expiryDate: '30 Set, 2023', status: 'Ativo' },
  { id: '2', code: 'PRIMAVERA20', type: 'Fixed', value: 50.00, usageCount: 445, usageLimit: 500, expiryDate: '15 Out, 2023', status: 'Ativo' },
  { id: '3', code: 'FRETEJURE', type: 'FreeShipping', value: 0, usageCount: 200, usageLimit: 200, expiryDate: '01 Ago, 2023', status: 'Expirado' },
  { id: '4', code: 'VIPOFF50', type: 'Percentage', value: 50, usageCount: 6, usageLimit: 50, expiryDate: '31 Dez, 2023', status: 'Inativo' },
];
