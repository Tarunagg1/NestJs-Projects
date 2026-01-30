import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as Schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;
    public db: NodePgDatabase<typeof Schema>;

    onModuleInit() {
        const connestionString = process.env.DATABASE_URL!;
        this.pool = new Pool({
            connectionString: connestionString,
        });

        this.db = drizzle(this.pool, { schema: Schema });
        console.log("Database connected");
    }

    onModuleDestroy() {
        this.pool?.end();
        console.log("Database disconnected");
    }
}
