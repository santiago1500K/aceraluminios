const nodemailer = require('nodemailer');

function clean(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const name = clean(body.name);
  const contact = clean(body.contact);
  const message = String(body.message || '').trim();

  if (!name || !contact || !message) {
    return res.status(400).json({ error: 'Completa nombre, contacto y mensaje.' });
  }
  if (name.length > 100 || contact.length > 150 || message.length > 1000) {
    return res.status(400).json({ error: 'Uno de los campos es demasiado largo.' });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Faltan las variables de entorno GMAIL_USER / GMAIL_APP_PASSWORD');
    return res.status(500).json({ error: 'El formulario no está configurado todavía. Escríbenos por WhatsApp mientras tanto.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Aceraluminios — Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: contact,
      subject: `Nuevo contacto desde la web: ${name}`,
      text: `Nombre: ${name}\nContacto: ${contact}\n\nMensaje:\n${message}`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error enviando correo:', err);
    return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo o escribe por WhatsApp.' });
  }
};
