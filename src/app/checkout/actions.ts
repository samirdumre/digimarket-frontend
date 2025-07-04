"use server";

import { redirect } from "next/navigation";
import { checkoutSchema } from "@/types/checkout";
import {cookies} from "next/headers";
import getApiUrl from "@/lib/api";

export async function handleCheckout(prevState, formData: FormData) {

  const data = {
    f_name: formData.get("f_name"),
    l_name: formData.get("l_name"),
    country: formData.get("country"),
    city: formData.get("city"),
    card_number: formData.get("card_number"),
    exp_month: formData.get("exp_month"),
    exp_year: formData.get("exp_year"),
    cvc: formData.get("cvc"),
    product_id: formData.get("product_id"),
  };

  // Validate with Zod
  const validated = checkoutSchema.safeParse(data);

  if (!validated.success) {
    const flattened = validated.error.flatten();
    return {
      success: false,
      message: flattened.formErrors.toString(),
      errors: flattened.fieldErrors,
      inputs: data
    }
  }

  // Data to create order
  const orderData = {
    'total_amount': formData.get("total_price"),
    'status': 'completed',
    'payment_status': 'paid',
    'payment_method': 'card',
    'billing_name': `${data.f_name} ${data.l_name}`,
    'billing_address': data.city
  }

  try {

    // Create order for the cart items after checkout
    // Create order_items and link each item to the order created
    await createOrder(orderData);

    // Redirect for all checkout actions take place
    redirect("/account");

  } catch (error) {
    if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Checkout error:", error);
    return;
  }
}

export async function createOrder(orderData){
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  const res = await fetch(getApiUrl(`/v1/orders`),{
    method: 'POST',
    headers:{
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(orderData)
  });

  if(!res.ok) {
    console.error("Couldn't create an order");
    return;
  }

  console.log("Order created successfully");
  return;
}

export async function getUserCart(){
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  const res = await fetch(getApiUrl(`/v1/get-user-cart`),{
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  });
  if(!res.ok) {
    console.error("Couldn't get user cart to cart");
    return;
  }
  const cartData = await res.json();
  return cartData.data;
}

export async function getProductsFromCart(){
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  const res = await fetch(getApiUrl('/v1/get-cart-products'),{
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  });
  if(!res.ok){
    console.error("Couldn't get products from the cart");
    return [];
  }
  const cartProducts = await res.json();
  return cartProducts.data;
}
