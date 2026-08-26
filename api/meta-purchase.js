const PIXEL_ID = '4641532832754429';
const GRAPH_API_VERSION = 'v26.0';

function cleanCookie(value) {
  return typeof value === 'string' && /^[A-Za-z0-9._-]{1,255}$/.test(value) ? value : undefined;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const token = process.env.META_CONVERSIONS_TOKEN;
  if (!token) return res.status(503).json({ ok: false });

  const forwardedHost = req.headers['x-forwarded-host'];
  const host = Array.isArray(forwardedHost) ? forwardedHost[0] : (forwardedHost || req.headers.host);
  try {
    if (!req.headers.origin || new URL(req.headers.origin).host !== host) {
      return res.status(403).json({ ok: false });
    }
  } catch {
    return res.status(403).json({ ok: false });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false }); }
  }

  const eventId = body && body.event_id;
  if (typeof eventId !== 'string' || !/^purchase-[A-Za-z0-9-]{8,100}$/.test(eventId)) {
    return res.status(400).json({ ok: false });
  }

  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = Array.isArray(forwardedFor) ? forwardedFor[0] : String(forwardedFor || '').split(',')[0].trim();
  const userData = {
    client_user_agent: req.headers['user-agent'] || undefined,
    client_ip_address: clientIp || undefined,
    fbp: cleanCookie(body.fbp),
    fbc: cleanCookie(body.fbc),
  };

  Object.keys(userData).forEach((key) => userData[key] === undefined && delete userData[key]);

  const payload = {
    data: [{
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: 'https://lisandra-salete.vercel.app/obrigada',
      user_data: userData,
      custom_data: { currency: 'BRL', value: 29.90 },
    }],
  };

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Meta Conversions API rejected the Purchase event.', response.status);
      return res.status(502).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Meta Conversions API request failed.', error instanceof Error ? error.message : 'unknown error');
    return res.status(502).json({ ok: false });
  }
};
