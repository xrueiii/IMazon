import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["google", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const productTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    productName: varchar("product_name", { length: 100 }).notNull().unique(),
    productDescription: varchar("product_description", {
      length: 300,
    }).notNull(),
    sellerdisplayId: uuid("seller_display_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    productNameIndex: index("display_id_index").on(table.displayId),
    sellerDiaplayIndex: index("email_index").on(table.sellerdisplayId),
  }),
);

export const productRelations = relations(productTable, ({ many }) => ({
  productToProductDetailTable: many(productToProductDetailTable),
}));

export const productDetailTable = pgTable(
  "products_detail",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    productQuantity: integer("product_quantity").notNull(),
    productSold: integer("product_sold").default(0),
    productPrice: varchar("product_price", { length: 20 }).notNull(),
    productImageLink: varchar("product_image_link").notNull(),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productStyle: varchar("product_color", { length: 20 }).notNull(),
  },
  (table) => ({
    productNameIndex: index("display_id_index").on(table.displayId),
  }),
);

export const productDetailRelations = relations(productTable, ({ many }) => ({
  productToProductDetailTable: many(productToProductDetailTable),
}));

export const productToProductDetailTable = pgTable(
  "product_to_product_detail",
  {
    id: serial("id").primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    productDetailId: uuid("product_detail_id")
      .notNull()
      .references(() => productDetailTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    productIdIndex: index("product_id_index").on(table.productId),
    productDetailIdIndex: index("product_detail_id_index").on(
      table.productDetailId,
    ),
  }),
);

export const productToProductDetailRelations = relations(
  productToProductDetailTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productToProductDetailTable.productId],
      references: [productTable.displayId],
    }),
    productDetail: one(productDetailTable, {
      fields: [productToProductDetailTable.productDetailId],
      references: [productDetailTable.displayId],
    }),
  }),
);
