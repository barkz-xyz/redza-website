export const chileRegions = [
  { id: "CLAP", name: "Arica y Parinacota", hub: "Arica", service: "Cobertura norte" },
  { id: "CLTA", name: "Tarapacá", hub: "Iquique", service: "Distribución norte" },
  { id: "CLAN", name: "Antofagasta", hub: "Antofagasta", service: "Carga industrial" },
  { id: "CLAT", name: "Atacama", hub: "Copiapó", service: "Distribución regional" },
  { id: "CLCO", name: "Coquimbo", hub: "La Serena", service: "Distribución regional" },
  { id: "CLVS", name: "Valparaíso", hub: "Valparaíso", service: "Puerto y última milla" },
  { id: "CLRM", name: "Santiago", hub: "Santiago", service: "Centro de coordinación" },
  { id: "CLLI", name: "O'Higgins", hub: "Rancagua", service: "Distribución B2B" },
  { id: "CLML", name: "Maule", hub: "Talca", service: "Carga y abastecimiento" },
  { id: "CLNB", name: "Ñuble", hub: "Chillán", service: "Distribución regional" },
  { id: "CLAR", name: "La Araucanía", hub: "Temuco", service: "Distribución regional" },
  { id: "CLBI", name: "Biobío", hub: "Concepción", service: "Carga industrial" },
  { id: "CLLR", name: "Los Ríos", hub: "Valdivia", service: "Cobertura sur" },
  { id: "CLLL", name: "Los Lagos", hub: "Puerto Montt", service: "Cobertura sur" },
  { id: "CLAI", name: "Aysén", hub: "Coyhaique", service: "Operación austral" },
  { id: "CLMA", name: "Magallanes", hub: "Punta Arenas", service: "Operación austral" },
] as const;

export const santiago = 'CLRM';
// Accept older quotation links without listing Santiago twice.
export const originName = (id: string | null) => chileRegions.find(r => r.id === (id === 'santiago' ? santiago : id))?.name;

