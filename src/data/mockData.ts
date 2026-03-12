export const user = {
  name: "Javier Álvarez",
  initials: "JA",
  tier: "Priority",
  lastLogin: "Hoy 9:41 PM"
}

export interface Account {
  name: string;
  number: string;
  balanceMXN: number | null;
  balanceUSD: number | null;
  cardColor: string;
}

export interface Product {
  id: string;
  category: string;
  badge: string | null;
  badgeVariant: string | null;
  balance: number | null;
  currency: string;
  bgColor: string;
  textColor: string;
  count: number | null;
  accounts?: Account[];
}

export const products: Product[] = [
  {
    id: "savings",
    category: "Bolsas de ahorro",
    badge: "Nuevo",
    badgeVariant: "nuevo",
    balance: 110000.00,
    currency: "MXN",
    bgColor: "#FFE8D6",
    textColor: "#CC5500",
    count: null
  },
  {
    id: "investments", 
    category: "Inversiones",
    badge: null,
    badgeVariant: null,
    balance: -73161.38,
    currency: "MXN",
    bgColor: "#E8E0FF",
    textColor: "#5533CC",
    count: 4
  },
  {
    id: "credit",
    category: "Tarjetas de crédito",
    badge: null,
    badgeVariant: null,
    balance: null,
    currency: "MXN",
    bgColor: "#003B5C",
    textColor: "#FFFFFF",
    count: 2
  },
  {
    id: "debit",
    category: "Cuentas de débito",
    badge: null,
    badgeVariant: null,
    balance: null,
    currency: "MXN",
    bgColor: "#FFFFFF",
    textColor: "#1A1A1A",
    count: 2,
    accounts: [
      {
        name: "Cuenta Priority",
        number: "**964",
        balanceMXN: 24500.00,
        balanceUSD: 1320.50,
        cardColor: "#003B5C"
      },
      {
        name: "MiCuenta",
        number: "**197", 
        balanceMXN: 8750.25,
        balanceUSD: null,
        cardColor: "#E3173E"
      }
    ]
  }
]

export interface Transaction {
  id: number;
  date: string;
  time: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  icon: string;
}

export const transactions: Transaction[] = [
  {
    id: 1,
    date: "11 Mar",
    time: "09:23",
    description: "Amazon México",
    category: "Compras",
    amount: -1249.00,
    currency: "MXN",
    status: "completed",
    icon: "ShoppingCart"
  },
  {
    id: 2,
    date: "11 Mar",
    time: "08:15",
    description: "OXXO Insurgentes",
    category: "Comercio",
    amount: -156.50,
    currency: "MXN",
    status: "completed",
    icon: "Store"
  },
  {
    id: 3,
    date: "10 Mar",
    time: "14:30",
    description: "Nómina Empresa SA",
    category: "Depósito",
    amount: 32000.00,
    currency: "MXN",
    status: "completed",
    icon: "Briefcase"
  },
  {
    id: 4,
    date: "10 Mar",
    time: "11:05",
    description: "Netflix",
    category: "Entretenimiento",
    amount: -219.00,
    currency: "MXN",
    status: "pending",
    icon: "Tv"
  },
  {
    id: 5,
    date: "09 Mar",
    time: "19:45",
    description: "Transferencia SPEI",
    category: "Transferencia",
    amount: -5000.00,
    currency: "MXN",
    status: "completed",
    icon: "ArrowUpRight"
  },
  {
    id: 6,
    date: "09 Mar",
    time: "16:20",
    description: "Uber Eats",
    category: "Restaurantes",
    amount: -385.00,
    currency: "MXN",
    status: "failed",
    icon: "UtensilsCrossed"
  },
  {
    id: 7,
    date: "08 Mar",
    time: "10:00",
    description: "CFE Pago",
    category: "Servicios",
    amount: -890.00,
    currency: "MXN",
    status: "completed",
    icon: "Zap"
  },
  {
    id: 8,
    date: "08 Mar",
    time: "09:30",
    description: "Spotify",
    category: "Entretenimiento",
    amount: -99.00,
    currency: "MXN",
    status: "completed",
    icon: "Music"
  }
]

export interface Offer {
  id: number;
  title: string;
  badge: string;
  badgeColor: string;
  image: string;
}

export const offers: Offer[] = [
  {
    id: 1,
    title: "Activa tu 1% de bonificación",
    badge: "Bonificación",
    badgeColor: "#FFE8D6",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Seguro de viaje incluido",
    badge: "Promoción",
    badgeColor: "#E8E0FF",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Meses sin intereses",
    badge: "Beneficios",
    badgeColor: "#E8F5E9",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop"
  }
]

export interface Credit {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
}

export const credits: Credit[] = [
  {
    id: 1,
    title: "Crédito personal",
    subtitle: "Hasta $200,000 MXN",
    badge: "Beneficios",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Crédito hipotecario",
    subtitle: "Tasa preferencial Priority",
    badge: "Beneficios",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop"
  }
]

export const formatCurrency = (amount: number, currency: string = "MXN"): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export const formatAmount = (amount: number): string => {
  const formatted = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(amount));
  return amount < 0 ? `-$${formatted}` : `+$${formatted}`;
}
