require("dotenv").config();

const postgres = require("postgres");
const sql = postgres();

type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

async function fetchInvoiceById(id: string) {
  // You can probably combine these into a single SQL query
  // However, we are intentionally splitting them to demonstrate
  // how to initialize multiple queries in parallel with JS.
  const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

  return data;
}

fetchInvoiceById("6a9a0e9f-c5f8-46d9-9d25-8dc3a81fd42a").then((v) =>
  console.log(v)
);
