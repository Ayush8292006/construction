import { ProductPageTemplate } from './_ProductTemplate';

const productData = {
  code: 'TNK',
  category: 'Products & Services',
  title: 'Tanks & Process Equipment',
  shortTitle: 'Tanks & Equipment',
  tagline: 'Storage tanks, reactors, vessels and custom process equipment — fabricated to your drawings.',
  desc: 'MS and SS storage tanks, process tanks, reactors, mixing vessels, receivers and custom-fabricated industrial equipment for chemical, pharmaceutical and process plants.',
  images: ['/client-01.jpeg', '/client-02.jpeg', '/client-03.jpeg'],
  items: [
    { title: 'MS Storage Tanks', desc: 'Carbon steel tanks for water, chemicals and utility services.', materials: 'MS · IS 2062' },
    { title: 'SS Storage Tanks', desc: 'Stainless steel tanks for food, pharma and corrosive media.', materials: 'SS304 · SS316' },
    { title: 'Process Tanks', desc: 'Process vessels with agitators, jackets and nozzles as per P&ID.', materials: 'MS · SS' },
    { title: 'Reactors & Mixing Vessels', desc: 'Jacketed reactors with agitator assemblies for chemical reactions.', materials: 'SS304 · SS316' },
    { title: 'Receivers', desc: 'Receivers, condensers and knockout drums for process lines.', materials: 'MS · SS' },
    { title: 'Custom Equipment', desc: 'Bespoke fabrication to client drawings and specifications.', materials: 'MS · SS · as specified' },
  ],
  materials: ['MS (IS 2062)', 'SS304', 'SS316', 'SS316L'],
  applications: ['Chemical plants', 'Pharmaceutical plants', 'Specialty chemical units', 'Process manufacturing', 'Industrial utilities', 'EPC projects'],
  scope: [
    'Drawing review and clarifications',
    'Material procurement and identification',
    'Cutting, rolling, fit-up and welding',
    'Nozzle and manway fabrication',
    'Dimensional and weld inspection',
    'Hydro / leak testing',
    'Surface preparation and dispatch',
    'Site erection and installation (optional)',
  ],
};

const ProductTanks = () => <ProductPageTemplate productData={productData} />;

export default ProductTanks;