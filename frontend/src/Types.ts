type TProduct = {
    name: string;
    description: string;
    price: number;
    img: string;
    stock: number;
    _id: string;
    colors?: string[];
    sizes?: string[];
}

type TCartEntry = { productId: string; quantity: number }

type TCart = TCartEntry[]

type TUser = {
    username: string;
    email: string;
    loyaltyPoints: number;
    isAdmin: boolean;
}

export type { TProduct, TCartEntry, TCart, TUser }
