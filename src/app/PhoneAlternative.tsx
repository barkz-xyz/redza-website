import { contactNumber, telephoneLink } from './service-links';

export default function PhoneAlternative() {
  return <p className="phone-alternative">¿Prefieres llamar?{' '}
    <a data-umami-event="phone-call" href={telephoneLink} aria-label={`Llamar a Redza al ${contactNumber}`}>{contactNumber}</a>
  </p>;
}
