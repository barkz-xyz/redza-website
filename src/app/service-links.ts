export const rampPath = '/servicios/transporte-con-rampa-hidraulica';
export const contactNumber = '+56 9 8788 5833';
const digits = contactNumber.replace(/\D/g, '');
export const telephoneLink = `tel:+${digits}`;
export const whatsappUrl = `https://wa.me/${digits}`;
export const quoteLink = (message: string) => `${whatsappUrl}?text=${encodeURIComponent(message)}`;
export const whatsappLink = quoteLink('Hola Redza, necesito cotizar un servicio de transporte.');
export const rampQuote = quoteLink('Hola Redza, necesito cotizar transporte con rampa hidráulica.\nOrigen: \nDestino: \nTipo de carga y cantidad de pallets: \nPeso y medidas aproximadas: \nFecha y condiciones de acceso: ');
