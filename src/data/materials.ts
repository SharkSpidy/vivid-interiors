import type { MaterialSpec } from '../types';

export const materials: MaterialSpec[] = [
  {
    id: 'smoked-walnut',
    name: 'Smoked American Walnut',
    species: 'Juglans nigra, kiln-dried to 8% moisture content',
    image: '/images/walnut-paneling.jpg',
    description:
      'Steamed to deepen the colour before machining, then laid up in a sequence-matched veneer. We use it where the grain has to run uninterrupted across several metres: fluted walls, executive desks, cabinet fronts with no visible hinge line.',
    applications: ['Fluted wall panelling', 'Executive desks', 'Hidden-hinge cabinetry', 'Pivot doors'],
    technical: [
      { label: 'Veneer', value: '0.6mm quarter-cut, sequence matched' },
      { label: 'Core', value: '18mm calibrated MDF or marine ply' },
      { label: 'Edge', value: '5mm solid walnut lipping' },
      { label: 'Sheen', value: 'Matte PU, 5%' },
    ],
    climateNote:
      'Sealed on all six faces and finished with a UV-resistant matte PU lacquer. Acclimatised for 72 hours before machining so panels do not move once they are on a Dubai wall.',
  },
  {
    id: 'rift-oak',
    name: 'Rift-Cut White Oak',
    species: 'Quercus alba, rift-sawn for a linear grain',
    image: '/images/oak-wardrobe.jpg',
    description:
      'Rift cutting gives a straight grain with very little fleck, which suits long wardrobe runs and ceiling slats. The oak is left pale, with a soap finish on residential work and a harder lacquer where hands and trolleys go past it.',
    applications: ['Linear grain wardrobes', 'Acoustic slat ceilings', 'Workstations', 'Stair linings'],
    technical: [
      { label: 'Veneer', value: '0.6mm rift-cut, book matched per run' },
      { label: 'Core', value: 'Marine ply, sealed edges, coastal spec' },
      { label: 'Acoustic', value: 'Slat cavity with 25mm felt infill' },
      { label: 'Sheen', value: 'Soap finish or 10% matte lacquer' },
    ],
    climateNote:
      'Marine-ply carcasses with edge-sealed veneer, specified for Ajman and Dubai villas where humidity swings between seasons. Acoustic slats are back-vented to stop condensation on the ceiling.',
  },
  {
    id: 'brass-fluted-timber',
    name: 'Champagne Brass & Fluted Timber',
    species: 'Brushed stainless with PVD champagne brass, solid oak flutes',
    image: '/images/office-fitout.jpg',
    description:
      'A brushed brass face wrapped around a fluted timber core. Drawings are set out at 1:1 in the workshop so the flute pitch meets the brass joint exactly, which is the part that usually goes wrong on site.',
    applications: ['Reception counters', 'Custom pivot doors', 'Inlaid joinery trim', 'Bar fronts'],
    technical: [
      { label: 'Brass', value: '1.2mm PVD champagne, brushed No.4' },
      { label: 'Flutes', value: '20mm solid oak, 12mm pitch' },
      { label: 'Substrate', value: 'Blackened steel frame' },
      { label: 'Joint', value: 'Flush, dry-fitted before polishing' },
    ],
    climateNote:
      'PVD coating is chosen over lacquered brass for UAE interiors: salt air dulls lacquer at the coast, and PVD keeps its tone with a damp cloth and no polish.',
  },
  {
    id: 'travertine-cove',
    name: 'Veined Travertine & 2700K Cove',
    species: 'Turkish travertine, honed and filled, 20mm slab',
    image: '/images/travertine-lounge.jpg',
    description:
      'Slabs are selected at the yard and numbered before cutting, so the vein carries from the floor to the double-height wall. The cove sits 120mm off the stone face and washes it without a visible source.',
    applications: ['Double-height feature walls', 'Monolith islands', 'Fireplace surrounds', 'Floor inlays'],
    technical: [
      { label: 'Slab', value: '20mm honed and filled travertine' },
      { label: 'Setting', value: 'Book matched, vein continuous' },
      { label: 'Lighting', value: '2700K LED, 120mm cove offset' },
      { label: 'Sealer', value: 'Penetrating, breathable stone sealer' },
    ],
    climateNote:
      'A breathable penetrating sealer rather than a film-forming one, so moisture can leave the stone in coastal humidity. LED drivers sit in a ventilated recess, away from the slab.',
  },
];
