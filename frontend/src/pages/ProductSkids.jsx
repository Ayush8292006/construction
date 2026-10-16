import { ProductPageTemplate } from './_ProductTemplate';

const productData = {
  code: 'SKD',
  category: 'Products & Services',
  title: 'Skids & Equipment Assemblies',
  shortTitle: 'Skids & Assemblies',
  tagline: 'Fabricated skid structures, equipment mounting frames and integrated assemblies.',
  desc: 'Fabricated skid structures, equipment mounting frames and integrated mechanical assemblies — delivered ready to install.',
  images: ['/client-03.jpeg', '/client-01.jpeg', '/client-02.jpeg'],
  items: [
    { title: 'Fabricated Skid Structures', desc: 'Modular skid bases for pumps, blowers, filters and packages.', materials: 'MS · SS' },
    { title: 'Equipment Mounting Frames', desc: 'Frames for mounting equipment on foundations or platforms.', materials: 'MS' },
    { title: 'Integrated Mechanical Assemblies', desc: 'Pre-assembled packages with equipment, piping and wiring.', materials: 'MS · SS' },
  ],
  materials: ['MS (IS 2062)', 'SS304', 'SS316'],
  applications: ['Chemical plants', 'Pharmaceutical plants', 'Process manufacturing', 'Industrial utilities', 'EPC projects'],
  scope: [
    'Drawing review and layout planning',
    'Cutting, fit-up and welding',
    'Equipment mounting and alignment',
    'Piping and electrical integration',
    'Dimensional and load checks',
    'Surface preparation and painting',
    'Dispatch ready to install',
  ],
};

const ProductSkids = () => <ProductPageTemplate productData={productData} />;

export default ProductSkids;