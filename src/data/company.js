// Single source of truth for all company content. Edit here, the whole site updates.
const u = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const company = {
  name: 'Al Fawaz International for Food Trading',
  short: 'Al Fawaz International',
  arabic: 'الفواز الدولية للتجارة الغذائية',
  cr: '249836',
  address: 'Zone 27, Street 950, Doha, Qatar',
  phone: '00974-33811309',
  phoneIntl: '+974 3381 1309',
  whatsapp: '97433811309',
  email: 'info@alfawazinternational.com',
  website: 'www.alfawazinternational.com',
  url: 'https://www.alfawazinternational.com',
  tagline: 'Right Product. Right Place. Right Time.',
  intro:
    'We distribute water, soft drinks and everyday food products to homes, retailers, supermarkets and businesses across Qatar, with fast order handling and delivery to the doorstep.',
  vision: {
    quote:
      'To be Qatar’s trusted food distribution partner, connecting quality products with customers through fast, reliable and convenient delivery.',
    text: 'We aim to build a strong distribution network that connects quality food products with homes, retailers, supermarkets, groceries and business customers across Qatar. Our long-term vision is to be recognised for speed, reliability, product quality and customer satisfaction.',
  },
  mission: {
    quote:
      'To distribute quality food products without delay and provide dependable home-delivery solutions that make everyday shopping easier.',
    text: 'Our mission is to make food distribution simple, fast and convenient. We keep products available, respond quickly to customer requirements, and make sure orders reach customers on time.',
  },
  philosophy: {
    line: ['Right Product.', 'Right Place.', 'Right Time.'],
    text: 'Customers should not have to wait for the products they need. Through efficient order handling, route planning, stock management and responsive customer service, we aim to give every customer a smooth and dependable distribution experience.',
  },
  delivery: {
    quote: 'From our distribution network to your doorstep.',
    text: 'Place your requirements through our communication channels and receive products directly at your door, saving the time and effort of visiting several outlets. As our network grows across Doha and the wider Qatar market, home delivery is what sets Al Fawaz International apart.',
  },
  values: [
    ['Customer First', 'Our customers are at the heart of everything we do. We listen to their requirements and work to provide fast, convenient and reliable service.'],
    ['Distribution Without Delay', 'Time matters. Customers should receive products when they need them, so we focus on speed, planning and dependable execution.'],
    ['Reliability', 'We keep our commitments. From receiving an order to final delivery, we aim to be a service customers can depend on.'],
    ['Quality', 'Quality is essential at every stage, from product selection and handling to distribution and delivery.'],
    ['Convenience', 'Our home-delivery approach makes purchasing easier. We bring products closer to the customer and save time and effort.'],
    ['Integrity', 'We do business with honesty, transparency and respect for customers, suppliers, employees and partners.'],
    ['Innovation', 'We keep looking for better ways to manage orders, distribution, customer communication and delivery.'],
    ['Partnership', 'Strong businesses are built on strong relationships. We work with suppliers, retailers and customers to create sustainable growth.'],
  ],
  commitments: [
    ['Distribution without delay', 'Fast order processing and efficient delivery to keep waiting time short.'],
    ['Home delivery', 'Delivery straight to customers’ homes, so families receive essentials without visiting multiple outlets.'],
    ['Reliable service', 'Consistent delivery performance and professional customer communication.'],
    ['Product availability', 'Adequate stock, and fewer out-of-stock situations.'],
    ['Customer convenience', 'Ordering and receiving made easier through direct communication and delivery.'],
    ['Qatar-wide growth', 'A stronger distribution network serving customers and business partners across Qatar.'],
    ['Business partnership', 'Long-term relationships with retailers, distributors, suppliers and customers.'],
  ],
  steps: [
    ['Order received', 'Send your list by phone, WhatsApp or email. We confirm quantities and timing quickly.'],
    ['Stock and route planned', 'Products are checked against stock and grouped into an efficient delivery route.'],
    ['On the road', 'Orders are loaded, handled with care and dispatched without waiting for a full day’s run.'],
    ['At your door', 'Delivered to your home, shop or site, with a clear point of contact if anything changes.'],
  ],
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Products', to: '/services' },
    { label: 'Contact', to: '/contact' },
  ],
  serves: ['Homes and families', 'Retailers and groceries', 'Supermarkets', 'Restaurants, cafés and offices'],
  images: {
    hero: '/assets/common/hero.png',
    heroSmall: u('photo-1566576721346-d4a3b4eaeb55', 700),
    warehouse: u('photo-1586528116311-ad8dd3c8310d', 1400),
    truck: u('photo-1601584115197-04ecc0da31d7', 1600),
    doorstep: u('photo-1566576721346-d4a3b4eaeb55', 1400),
    grocery: u('photo-1542838132-92c53300491e', 1400),
    shelves: u('photo-1604719312566-8912e9227c6a', 1400),
    city: u('photo-1559564484-e48b3e040ff4', 1800),
  },
  categories: [
    { name: 'Bottled Water', blurb: 'Small bottles, 1.5 L packs and large dispenser jugs for homes, offices and shops.', items: ['Still drinking water', 'Mineral water', 'Sparkling water', '5 and 19 litre jugs', 'Multi-pack cartons'], img: '/assets/products/bottled-water.png' },
    { name: 'Soft Drinks and Colas', blurb: 'The fast-moving fizzy brands every counter, canteen and family fridge needs.', items: ['Cola and diet cola', 'Lemon-lime and orange sodas', 'Cans, PET bottles and multipacks', 'Flavoured sodas'], img: '/assets/products/coca-cola.png'},
    { name: 'Juices and Energy Drinks', blurb: 'Ready-to-drink juices, nectars and energy drinks for every shelf and cooler.', items: ['Fruit juices and nectars', 'Energy drinks', 'Sports and isotonic drinks', 'Iced tea and malt drinks'], img: '/assets/products/energy-drinks.png' },
    { name: 'Dairy and Chilled', blurb: 'Everyday dairy delivered with the freshness customers expect.', items: ['Fresh and long-life milk', 'Laban and yoghurt', 'Cheese and cream', 'Flavoured milk'], img: '/assets/products/dairy.png' },
    { name: 'Rice, Flour and Staples', blurb: 'The pantry basics that homes and kitchens order again and again.', items: ['Rice and pulses', 'Flour, sugar and salt', 'Pasta and noodles', 'Cooking oil and ghee'], img: '/assets/products/rice.png' },
    { name: 'Packed and Canned Foods', blurb: 'Long-shelf-life foods for stocking supermarkets, groceries and catering kitchens.', items: ['Canned vegetables and beans', 'Tuna and canned fish', 'Tomato paste and sauces', 'Jams, spreads and condiments'], img: '/assets/products/packed-foods.png' },
  ],
  alsoSupplied: ['Tea and coffee', 'Biscuits and snacks', 'Chocolates and confectionery', 'Breakfast cereals', 'Spices and seasonings', 'Frozen foods', 'Dates and dry fruits', 'Disposable cups and catering supplies'],
}

export const waLink = (text = 'Hello Al Fawaz International, I would like to place an order.') =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`
