// import fetch from "node-fetch";
import 'dotenv/config';

const value = process.env.AMOUNT_TO_PAY;

const CLIENT_ID = process.env.PAYPAL_CURRENT_ENVIRONMENT_ID;
const APP_SECRET = process.env.PAYPAL_CURRENT_ENVIRONMENT_SECRET;
const base = process.env.PAYPAL_CURRENT_ENVIRONMENT;

export async function createOrder() {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: "post",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
            {
            amount: {
                currency_code: "USD",
                value: value,
            },
            },
        ],
        }),
    });

    return handleResponse(response);
}

export async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
        method: "post",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
}

export async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}