import { Factory, Workflow, Boxes, Building2, Wrench } from 'lucide-react';

export const CONTACT = {
  phone: '+91 XXXXX XXXXX',
  phoneHref: 'tel:+91XXXXXXXXXX',
  email: 'info@yourdomain.com',
  whatsapp: 'https://wa.me/91XXXXXXXXXX',
};

export const NAV = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Products & Services',
    path: '/products',
    children: [
      {
        label: 'Tanks & Process Equipment',
        desc: 'MS & SS tanks, reactors, receivers',
        path: '/products/tanks-process-equipment',
        icon: Factory,
      },
      {
        label: 'Piping',
        desc: 'Process & utility piping, spools, supports',
        path: '/products/piping',
        icon: Workflow,
      },
      {
        label: 'Skids & Equipment Assemblies',
        desc: 'Skid structures, mounting frames',
        path: '/products/skids-assemblies',
        icon: Boxes,
      },
      {
        label: 'Structural Fabrication',
        desc: 'Platforms, pipe racks, staircases',
        path: '/products/structural-fabrication',
        icon: Building2,
      },
      {
        label: 'Mechanical Execution',
        desc: 'Erection, installation, shutdown work',
        path: '/products/mechanical-execution',
        icon: Wrench,
      },
    ],
  },
  { label: 'Industries', path: '/industries' },
  { label: 'Quality & Safety', path: '/quality-safety-infrastructure' },
  { label: 'Clientele', path: '/clientele' },
  { label: 'Contact', path: '/contact' },
];