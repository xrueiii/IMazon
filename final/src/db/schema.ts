import { index, integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

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
    productDescription: varchar("product_description", { length: 300 }).notNull(),
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

export const productDetailTable = pgTable(
  "products_detail",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    productQuantity: integer("product_quantity").notNull(),
    productSold: integer("product_sold").default(0),
    productPrice: integer("product_price").notNull(),
    productImageLink: varchar("product_image_link").notNull(),
    productStyle: varchar("product_color", { length: 20 }).notNull(),
    productSize: varchar("product_size", { length: 20 }).default(""),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    productNameIndex: index("display_id_index").on(table.displayId),
  }),
);