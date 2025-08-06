import { PartnerItem } from "./partner-item";

const PARTNERS = [
  {
    id: 1,
    name: "Nike",
    imageUrl: "/partners/nike.svg",
  },
  {
    id: 2,
    name: "Adidas",
    imageUrl: "/partners/adidas.svg",
  },
  {
    id: 3,
    name: "Puma",
    imageUrl: "/partners/puma.svg",
  },
  {
    id: 4,
    name: "New Balance",
    imageUrl: "/partners/new-balance.svg",
  },
  {
    id: 5,
    name: "Converse",
    imageUrl: "/partners/converse.svg",
  },
  {
    id: 6,
    name: "Polo",
    imageUrl: "/partners/polo.svg",
  },
  {
    id: 7,
    name: "Zara",
    imageUrl: "/partners/zara.svg",
  },
];

export function PartnersList() {
  return (
    <div className="space-y-6">
      <h3 className="px-5 text-lg font-semibold">Marcas parceiras</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {PARTNERS.map((partner) => (
          <PartnerItem key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}
