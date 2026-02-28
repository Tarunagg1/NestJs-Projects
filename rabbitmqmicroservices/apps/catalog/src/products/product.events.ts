export type ProductCreatedEvents = {
    productId: string;
    name: string;
    description: string;
    price: number;
    status: "ACTIVE" | "DRAFT";
    imageUrl?: string;
    createdByClerkUserId: string;
}


