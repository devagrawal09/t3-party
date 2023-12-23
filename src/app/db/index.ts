import { db } from "~/server/db";
import type { Order, Coffee, Code } from "../(_domain)";

const coffees: Coffee[] = [
  { id: "1", name: "latte" },
  { id: "2", name: "cappuccino" },
];

export const getOrder = async (id: string) => {
  const orderData = await db.order.findUnique({ where: { id } });
  if (!orderData) return;
  return {
    ...orderData,
    coffee: coffees.find((c) => c.id === orderData.coffeeId)!,
    status: orderData.status as Order["status"],
  } satisfies Order;
};

export const getOrders = async (params?: { userId: string }) => {
  const orderData = await db.order.findMany({
    where: params ? { userId: params.userId } : undefined,
  });
  return orderData.map((order) => ({
    ...order,
    coffee: coffees.find((c) => c.id === order.coffeeId)!,
    status: order.status as Order["status"],
  })) satisfies Order[];
};

export const setOrder = async (order: Order) => {
  const orderData = await db.order.upsert({
    where: { id: order.id },
    update: {
      id: order.id,
      coffeeId: order.coffee.id,
      userId: order.userId,
      status: order.status,
    },
    create: {
      id: order.id,
      coffeeId: order.coffee.id,
      userId: order.userId,
      status: order.status,
    },
  });
  return {
    ...orderData,
    coffee: coffees.find((c) => c.id === orderData.coffeeId)!,
    status: orderData.status as Order["status"],
  } satisfies Order;
};

export const getCoffee = (coffeeId: string) =>
  coffees.find((c) => c.id === coffeeId);

export const getCoffees = () => coffees;

export const getCurrentCode = () => ({ code: 1234, uses: 1 }) satisfies Code;

export const incrementCurrentCode = () => void 0;

export const setCurrentCode = ({ code, uses }: Code) => void 0;
