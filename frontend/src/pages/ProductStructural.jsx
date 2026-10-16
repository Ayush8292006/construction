import { ProductPageTemplate } from './_ProductTemplate';

const productData = {
  code: 'STR',
  category: 'Products & Services',
  title: 'Structural Fabrication',
  shortTitle: 'Structural',
  tagline: 'Industrial structural steel, platforms, walkways, pipe racks and staircases.',
  desc: 'Industrial structural steel, equipment platforms, walkways, pipe racks, staircases and access structures for process plants.',
  images: ['/client-04.jpeg', '/client-01.jpeg', '/client-02.jpeg'],
  items: [
    { title: 'Industrial Structural Fabrication', desc: 'Columns, beams, bracings and trusses for industrial sheds.', materials: 'MS · IS 2062' },
    { title: 'Equipment Platforms & Walkways', desc: 'Access platforms with grating, handrails and toe guards.', materials: 'MS · Galvanised' },
    { title: 'Pipe Racks & Pipe Supports', desc: 'Multi-tier pipe racks and structural pipe supports.', materials: 'MS' },
    { title: 'Staircases & Access Structures', desc: 'Industrial staircases, ladders and caged access.', materials: 'MS · Galvanised' },
    { title: 'Equipment Supporting Structures', desc: 'Skids, frames and support structures for equipment.', materials: 'MS' },
  ],
  materials: ['MS (IS 2062)', 'MS (Galvanised)', 'SS'],
  applications: ['Chemical plants', 'Pharmaceutical plants', 'Process manufacturing', 'Industrial utilities', 'EPC projects'],
  scope: [
    'Drawing and BOQ review',
    'Cutting, drilling and fit-up',
    'Welding to approved WPS',
    'Dimensional and weld inspection',
    'Surface preparation',
    'Painting / galvanising',
    'Dispatch and site erection',
  ],
};

const ProductStructural = () => <ProductPageTemplate productData={productData} />;

export default ProductStructural;