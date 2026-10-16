import { ProductPageTemplate } from './_ProductTemplate';

const productData = {
  code: 'MEC',
  category: 'Products & Services',
  title: 'Mechanical Execution',
  shortTitle: 'Mechanical',
  tagline: 'Erection, installation, site fabrication, modification and shutdown works.',
  desc: 'Mechanical erection, equipment installation, site fabrication, plant modification and shutdown works for process plants.',
  images: ['/client-01.jpeg', '/client-04.jpeg', '/client-03.jpeg'],
  items: [
    { title: 'Mechanical Erection', desc: 'Lifting, alignment and installation of equipment at site.', materials: 'All' },
    { title: 'Equipment Installation', desc: 'Pumps, vessels, exchangers, columns and package units.', materials: 'All' },
    { title: 'Site Fabrication', desc: 'Fabrication and modification works carried out at site.', materials: 'MS · SS' },
    { title: 'Plant Modification Works', desc: 'Revamp, tie-ins and shutdown modifications.', materials: 'MS · SS' },
    { title: 'Shutdown & Maintenance Fab', desc: 'Fast-track shutdown fabrication and repair works.', materials: 'MS · SS' },
  ],
  materials: ['MS', 'SS304', 'SS316'],
  applications: ['Chemical plants', 'Pharmaceutical plants', 'Specialty chemical units', 'Process manufacturing', 'Industrial utilities', 'EPC projects'],
  scope: [
    'Site survey and work planning',
    'Manpower and equipment mobilisation',
    'Rigging and lifting',
    'Alignment and fit-up',
    'Welding and inspection',
    'Testing and commissioning support',
    'Documentation and handover',
  ],
};

const ProductMechanical = () => <ProductPageTemplate productData={productData} />;

export default ProductMechanical;