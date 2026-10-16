import { ProductPageTemplate } from './_ProductTemplate';

const productData = {
  code: 'PIP',
  category: 'Products & Services',
  title: 'Piping',
  shortTitle: 'Piping',
  tagline: 'MS and SS process piping, utility lines, spools and supports — fabricated and installed.',
  desc: 'MS and SS process piping, utility piping, pipe spool fabrication, pipe supports and complete piping installation and erection for process plants.',
  images: ['/client-02.jpeg', '/client-01.jpeg', '/client-03.jpeg'],
  items: [
    { title: 'MS Process Piping', desc: 'Carbon steel process lines for chemical and utility services.', materials: 'MS · IS 1239 · IS 3589' },
    { title: 'SS Process Piping', desc: 'Stainless steel process lines for pharma, food and corrosive media.', materials: 'SS304 · SS316' },
    { title: 'Utility Piping', desc: 'Steam, air, water, nitrogen and effluent lines.', materials: 'MS · SS' },
    { title: 'Pipe Spool Fabrication', desc: 'Pre-fabricated spools to isometric drawings for site assembly.', materials: 'MS · SS' },
    { title: 'Pipe Supports & Associated Fab', desc: 'Shoe supports, guides, hangers and structural supports.', materials: 'MS · Galvanised' },
    { title: 'Piping Installation & Erection', desc: 'Site fit-up, alignment, welding and testing of piping systems.', materials: 'All' },
  ],
  materials: ['MS (IS 1239)', 'MS (IS 3589)', 'SS304', 'SS316'],
  applications: ['Chemical plants', 'Pharmaceutical plants', 'Specialty chemical units', 'Process manufacturing', 'Industrial utilities', 'EPC projects'],
  scope: [
    'Isometric drawing review',
    'Material procurement and traceability',
    'Cutting, beveling, fit-up and welding',
    'Spool fabrication in the workshop',
    'Dispatch with spool identification',
    'Site fit-up and welding',
    'Dimensional and weld inspection',
    'Hydro testing and flushing',
  ],
};

const ProductPiping = () => <ProductPageTemplate productData={productData} />;

export default ProductPiping;