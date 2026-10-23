export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, service: 'capqroo-payments', timezone: 'America/Cancun' });
    }

    if (url.pathname === '/checkout') {
      const body = await request.json().catch(() => ({}));

      return Response.json({
        ok: true,
        mode: 'development',
        message: 'Checkout de Mercado Pago listo para conectarse con el backend y validación de referencia.',
        received: body,
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};

type Env = {
  MERCADOPAGO_ACCESS_TOKEN?: string;
};
