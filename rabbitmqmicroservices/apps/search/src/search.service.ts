import { Injectable } from '@nestjs/common';
import { SearchProduct, SearchProductDocument } from './search/search-index-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(SearchProduct.name) private searchProductModel: Model<SearchProductDocument>
  ) { }

  normalizeText(input: { name: string, description: string }): string {
    const combined = `${input.name} ${input.description}`;
    return combined.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  async upsertFromCatalogEvent(input: { productId: string, name: string, price: number, status: "ACTIVE" | "DRAFT", description: string }) {
    const normalizeText = this.normalizeText({ name: input.name, description: input.description });
    await this.searchProductModel.findOneAndUpdate(
      { productId: input.productId },
      {
        name: input.name,
        price: input.price,
        status: input.status,
        normalizeText
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }


  async query(input: { q: string, limit?: number }) {
    const q = (input.q ?? "").trim().toLocaleLowerCase();

    if (!q) {
      return [];
    }

    const limit = Math.min(Math.max(input.limit ?? 10, 1), 20);

    const regex = new RegExp(q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');

    // const normalizedQuery = this.normalizeText({ name: q, description: '' });
    return this.searchProductModel.find(
      { normalizeText: { $regex: regex, $options: 'i' }, status: "ACTIVE" },
      null,
      { limit }
    ).exec();
  }

  ping() {
    return {
      status: 'ok',
      service: "search",
      now: new Date()
    }
  }
}
