# Studio Bake / 焙室

Pickup-first marketing + ordering site for a two-person handmade bakery serving Greater Boston.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All editable copy lives in **`src/content/site.ts`**:

| What | Field |
| --- | --- |
| Placeholder brand name | `brand.en`, `brand.zh`, `brand.mark` |
| Tagline / hero / about | `tagline`, `hero`, `about` |
| Pickup weekday, window, location | `pickup.*` |
| Venmo / Zelle / WeChat notes | `payment.*` |
| Contact | `contact.*` |

Products: **`src/content/products.ts`**.

## Payment (v1)

After checkout submit: unique order ID + total → customer pays via **Venmo / Zelle** (WeChat QR placeholder). Orders persist in **`localStorage`**. Status starts as `awaiting_payment`; demo “I’ve paid” + merchant “mark paid” toggles.

## Future slots

- Delivery courier: `FutureSlots.tsx` (`DELIVERY_ENABLED`)
- Stripe / card / PayPal: same file (`CARD_PAYMENTS_ENABLED`) + disabled button on confirmation
