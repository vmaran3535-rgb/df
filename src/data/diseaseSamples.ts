export interface DiseaseSample {
  id: string;
  cropName: string;
  conditionName: string;
  description: string;
  thumbnailUrl: string;
  hint: string;
}

export const DISEASE_SAMPLES: DiseaseSample[] = [
  {
    id: 'sample-rice-blast',
    cropName: 'Paddy / Rice',
    conditionName: 'Rice Blast (Magnaporthe oryzae)',
    description: 'Spindle-shaped lesions with brown margins on leaf blade and collar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    hint: 'Paddy with spindle lesions on leaves during humid monsoon'
  },
  {
    id: 'sample-tomato-blight',
    cropName: 'Tomato',
    conditionName: 'Early Blight (Alternaria solani)',
    description: 'Target-board concentric rings on lower leaves with yellow halo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
    hint: 'Tomato plant showing concentric dark spots on foliage'
  },
  {
    id: 'sample-cotton-bollworm',
    cropName: 'Cotton',
    conditionName: 'Pink Bollworm & Square Damage',
    description: 'Rosetted flowers, bored bolls with larval entry holes and frass',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=500&q=80',
    hint: 'Cotton squares showing internal caterpillar feeding damage'
  },
  {
    id: 'sample-potato-late-blight',
    cropName: 'Potato',
    conditionName: 'Late Blight (Phytophthora infestans)',
    description: 'Water-soaked irregular black lesions with white fungal down on leaf underside',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    hint: 'Potato leaf with water-soaked necrotic patches'
  },
  {
    id: 'sample-healthy-paddy',
    cropName: 'Paddy / Rice',
    conditionName: 'Healthy Vibrant Crop',
    description: 'Vigorous emerald green leaves without spots, even tillering',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80',
    hint: 'Healthy paddy field during tillering'
  }
];
