"use server";

import { redirect } from "next/navigation";
import { checkoutSchema } from "@/types/checkout";
import {cookies} from "next/headers";

export async function handleCheckout(prevState, formData: FormData) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

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

  try {
    // Remove items from the cart after checkout
    await removeCartItems();

    // Redirect for all checkout actions take place
    redirect("/products");

  } catch (error) {
    if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Checkout error:", error);
    return;
  }
}

export async function removeCartItems(){
  try{
    const res = await fetch('http://localhost/api/v1/remove-all-cart-items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    });

    if(!res.ok){
      console.error("Couldn't remove the cart items from the database");
    }
  } catch (error){
    console.error("Error removing cart items after successful purchase");
  }
}

export async function getUserCart(){
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  const res = await fetch(`http://localhost/api/v1/get-user-cart`,{
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  });
  if(!res.ok) {
    console.error("Couldn't add to cart");
    return;
  }
  const cartData = await res.json();
  return cartData.data;
}

export async function getProductsFromCart(){
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  const res = await fetch('http://localhost/api/v1/get-cart-products',{
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  });
  if(!res.ok){
    console.error("Couldn't get products from the cart");
    return;
  }
  const cartProducts = await res.json();
  return cartProducts.data;
}
