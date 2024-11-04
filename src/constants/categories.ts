import { 
  Car, 
  Home, 
  Laptop, 
  Shirt, 
  Briefcase, 
  Dumbbell, 
  Sofa,
  Baby,
  Wrench,
  TreePine,
  Camera,
  Plane,
  Gamepad,
  PawPrint,
  Watch,
  Bike,
  Palette,
  Music,
  Book,
  Utensils,
  Gem,
  Tool,
  Smartphone,
  Tv,
  Headphones
} from 'lucide-react';

export interface CategoryField {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  unit?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  subcategories: string[];
  fields: CategoryField[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'vehicles',
    name: 'Véhicules',
    icon: Car,
    subcategories: ['Voitures', 'Motos', 'Utilitaires', 'Caravanes', 'Bateaux', 'Vélos électriques', 'Scooters', 'Camping-cars', 'Remorques', 'Pièces auto'],
    fields: [
      { name: 'brand', type: 'text', label: 'Marque', required: true },
      { name: 'model', type: 'text', label: 'Modèle', required: true },
      { name: 'year', type: 'number', label: 'Année', required: true },
      { name: 'mileage', type: 'number', label: 'Kilométrage', unit: 'km', required: true },
      { name: 'fuel', type: 'select', label: 'Carburant', options: ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL', 'Hydrogène'] },
      { name: 'transmission', type: 'select', label: 'Transmission', options: ['Manuelle', 'Automatique', 'Semi-automatique'] },
      { name: 'color', type: 'text', label: 'Couleur' },
      { name: 'power', type: 'number', label: 'Puissance', unit: 'CV' },
      { name: 'doors', type: 'number', label: 'Nombre de portes' },
      { name: 'registration', type: 'text', label: 'Plaque d\'immatriculation' },
    ]
  },
  {
    id: 'real-estate',
    name: 'Immobilier',
    icon: Home,
    subcategories: ['Vente appartement', 'Vente maison', 'Location appartement', 'Location maison', 'Colocation', 'Bureaux', 'Locaux commerciaux', 'Parkings', 'Terrains', 'Résidences secondaires'],
    fields: [
      { name: 'type', type: 'select', label: 'Type de bien', options: ['Appartement', 'Maison', 'Studio', 'Loft', 'Chalet', 'Villa', 'Duplex', 'Attique'], required: true },
      { name: 'rooms', type: 'number', label: 'Nombre de pièces', required: true },
      { name: 'surface', type: 'number', label: 'Surface', unit: 'm²', required: true },
      { name: 'floor', type: 'number', label: 'Étage' },
      { name: 'parking', type: 'boolean', label: 'Place de parking' },
      { name: 'furnished', type: 'boolean', label: 'Meublé' },
      { name: 'balcony', type: 'boolean', label: 'Balcon/Terrasse' },
      { name: 'elevator', type: 'boolean', label: 'Ascenseur' },
      { name: 'energyClass', type: 'select', label: 'Classe énergétique', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      { name: 'yearBuilt', type: 'number', label: 'Année de construction' },
    ]
  },
  {
    id: 'electronics',
    name: 'Électronique',
    icon: Laptop,
    subcategories: ['Ordinateurs portables', 'Ordinateurs de bureau', 'Smartphones', 'Tablettes', 'Consoles de jeux', 'TV/Écrans', 'Audio', 'Photo/Vidéo', 'Accessoires', 'Composants PC'],
    fields: [
      { name: 'brand', type: 'text', label: 'Marque', required: true },
      { name: 'model', type: 'text', label: 'Modèle', required: true },
      { name: 'storage', type: 'text', label: 'Capacité de stockage' },
      { name: 'warranty', type: 'boolean', label: 'Garantie' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'État moyen'] },
      { name: 'os', type: 'select', label: 'Système d\'exploitation', options: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'] },
      { name: 'screenSize', type: 'number', label: 'Taille d\'écran', unit: 'pouces' },
      { name: 'processor', type: 'text', label: 'Processeur' },
      { name: 'ram', type: 'number', label: 'Mémoire RAM', unit: 'Go' },
    ]
  },
  {
    id: 'fashion',
    name: 'Mode',
    icon: Shirt,
    subcategories: ['Vêtements homme', 'Vêtements femme', 'Chaussures', 'Accessoires', 'Montres', 'Bijoux', 'Sacs', 'Beauté', 'Sport', 'Luxe'],
    fields: [
      { name: 'brand', type: 'text', label: 'Marque', required: true },
      { name: 'size', type: 'select', label: 'Taille', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'color', type: 'text', label: 'Couleur' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf avec étiquette', 'Neuf sans étiquette', 'Très bon état', 'Bon état', 'Satisfaisant'] },
      { name: 'material', type: 'text', label: 'Matière' },
      { name: 'style', type: 'select', label: 'Style', options: ['Casual', 'Chic', 'Sport', 'Business', 'Soirée'] },
      { name: 'season', type: 'select', label: 'Saison', options: ['Printemps', 'Été', 'Automne', 'Hiver', 'Toutes saisons'] },
    ]
  },
  {
    id: 'jobs',
    name: 'Emploi',
    icon: Briefcase,
    subcategories: ['CDI', 'CDD', 'Stage', 'Apprentissage', 'Freelance', 'Temps partiel', 'Job étudiant', 'Formation', 'Intérim', 'Services à domicile'],
    fields: [
      { name: 'sector', type: 'select', label: 'Secteur', options: ['IT', 'Finance', 'Marketing', 'Vente', 'Santé', 'Education', 'Construction', 'Hôtellerie', 'Transport', 'Autre'], required: true },
      { name: 'experience', type: 'select', label: 'Expérience requise', options: ['Débutant', '1-2 ans', '3-5 ans', '5-10 ans', '+10 ans'] },
      { name: 'education', type: 'select', label: 'Formation', options: ['Aucun diplôme', 'CFC', 'Maturité', 'Bachelor', 'Master', 'Doctorat'] },
      { name: 'schedule', type: 'select', label: 'Horaires', options: ['Temps plein', 'Temps partiel', 'Flexible', 'Télétravail'] },
      { name: 'salary', type: 'number', label: 'Salaire annuel', unit: 'CHF' },
      { name: 'startDate', type: 'text', label: 'Date de début' },
      { name: 'languages', type: 'multiselect', label: 'Langues requises', options: ['Français', 'Allemand', 'Italien', 'Anglais'] },
    ]
  },
  {
    id: 'sports',
    name: 'Sport',
    icon: Dumbbell,
    subcategories: ['Fitness', 'Ski/Snowboard', 'Vélos', 'Sports d\'équipe', 'Running', 'Sports de combat', 'Tennis', 'Golf', 'Sports nautiques', 'Randonnée'],
    fields: [
      { name: 'type', type: 'text', label: 'Type d\'équipement', required: true },
      { name: 'brand', type: 'text', label: 'Marque' },
      { name: 'size', type: 'text', label: 'Taille/Dimension' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Très bon état', 'Bon état', 'Utilisé', 'Pour pièces'] },
      { name: 'gender', type: 'select', label: 'Genre', options: ['Homme', 'Femme', 'Unisexe', 'Enfant'] },
      { name: 'level', type: 'select', label: 'Niveau', options: ['Débutant', 'Intermédiaire', 'Avancé', 'Professionnel'] },
    ]
  },
  {
    id: 'home',
    name: 'Maison',
    icon: Sofa,
    subcategories: ['Meubles', 'Électroménager', 'Décoration', 'Jardin', 'Bricolage', 'Cuisine', 'Linge de maison', 'Luminaires', 'Arts de la table', 'Rangement'],
    fields: [
      { name: 'type', type: 'text', label: 'Type d\'article', required: true },
      { name: 'material', type: 'text', label: 'Matériau' },
      { name: 'dimensions', type: 'text', label: 'Dimensions' },
      { name: 'style', type: 'select', label: 'Style', options: ['Moderne', 'Classique', 'Industriel', 'Scandinave', 'Vintage'] },
      { name: 'color', type: 'text', label: 'Couleur' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Très bon état', 'Bon état', 'À rénover'] },
      { name: 'assembly', type: 'boolean', label: 'Montage requis' },
    ]
  },
  {
    id: 'kids',
    name: 'Enfants',
    icon: Baby,
    subcategories: ['Vêtements', 'Jouets', 'Puériculture', 'Mobilier', 'Livres', 'Jeux vidéo', 'École/Études', 'Sport', 'Accessoires', 'Chaussures'],
    fields: [
      { name: 'ageRange', type: 'select', label: 'Tranche d\'âge', options: ['0-6 mois', '6-12 mois', '1-2 ans', '2-3 ans', '3-4 ans', '4-6 ans', '6-8 ans', '8-10 ans', '10-12 ans', '12+ ans'], required: true },
      { name: 'gender', type: 'select', label: 'Genre', options: ['Garçon', 'Fille', 'Unisexe'] },
      { name: 'brand', type: 'text', label: 'Marque' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf avec étiquette', 'Neuf sans étiquette', 'Très bon état', 'Bon état', 'Utilisé'] },
      { name: 'season', type: 'select', label: 'Saison', options: ['Printemps', 'Été', 'Automne', 'Hiver', 'Toutes saisons'] },
    ]
  },
  {
    id: 'services',
    name: 'Services',
    icon: Wrench,
    subcategories: ['Cours particuliers', 'Bricolage', 'Jardinage', 'Ménage', 'Déménagement', 'Informatique', 'Beauté', 'Événements', 'Transport', 'Garde d\'enfants'],
    fields: [
      { name: 'type', type: 'text', label: 'Type de service', required: true },
      { name: 'experience', type: 'select', label: 'Expérience', options: ['Débutant', 'Intermédiaire', 'Expert', 'Professionnel'] },
      { name: 'availability', type: 'multiselect', label: 'Disponibilités', options: ['Matin', 'Après-midi', 'Soir', 'Week-end'] },
      { name: 'location', type: 'text', label: 'Zone d\'intervention' },
      { name: 'rate', type: 'number', label: 'Tarif horaire', unit: 'CHF' },
      { name: 'certified', type: 'boolean', label: 'Certifié/Diplômé' },
    ]
  },
  {
    id: 'multimedia',
    name: 'Multimédia',
    icon: Camera,
    subcategories: ['TV', 'Home cinéma', 'Photo', 'Vidéo', 'Audio', 'DJ', 'Instruments', 'Accessoires', 'Projecteurs', 'Streaming'],
    fields: [
      { name: 'brand', type: 'text', label: 'Marque', required: true },
      { name: 'model', type: 'text', label: 'Modèle', required: true },
      { name: 'resolution', type: 'select', label: 'Résolution', options: ['HD', 'Full HD', '4K', '8K'] },
      { name: 'connectivity', type: 'multiselect', label: 'Connectivité', options: ['HDMI', 'USB', 'Bluetooth', 'Wi-Fi', 'Ethernet'] },
      { name: 'warranty', type: 'boolean', label: 'Garantie' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'État moyen'] },
    ]
  },
  {
    id: 'hobbies',
    name: 'Loisirs',
    icon: Plane,
    subcategories: ['Voyages', 'Musique', 'Collection', 'Livres', 'DVD/Blu-ray', 'Jeux de société', 'Artisanat', 'Jardinage', 'Cuisine', 'Bien-être'],
    fields: [
      { name: 'type', type: 'text', label: 'Type d\'article', required: true },
      { name: 'category', type: 'select', label: 'Catégorie', options: ['Collection', 'Pratique', 'Apprentissage', 'Divertissement'] },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Très bon état', 'Bon état', 'Acceptable'] },
      { name: 'rarity', type: 'select', label: 'Rareté', options: ['Commune', 'Peu commune', 'Rare', 'Très rare', 'Unique'] },
      { name: 'age', type: 'text', label: 'Âge/Année' },
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad,
    subcategories: ['Consoles', 'Jeux vidéo', 'Accessoires', 'PC Gaming', 'Retrogaming', 'VR/AR', 'Figurines', 'Cartes', 'Goodies', 'Streaming'],
    fields: [
      { name: 'platform', type: 'select', label: 'Plateforme', options: ['PS5', 'PS4', 'Xbox Series', 'Xbox One', 'Switch', 'PC', 'Retro'], required: true },
      { name: 'genre', type: 'select', label: 'Genre', options: ['Action', 'Aventure', 'RPG', 'Sport', 'Course', 'Stratégie', 'FPS', 'Famille'] },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'État moyen'] },
      { name: 'edition', type: 'select', label: 'Édition', options: ['Standard', 'Collector', 'Limitée', 'GOTY'] },
      { name: 'language', type: 'multiselect', label: 'Langues', options: ['Français', 'Anglais', 'Allemand', 'Italien'] },
    ]
  },
  {
    id: 'pets',
    name: 'Animaux',
    icon: PawPrint,
    subcategories: ['Chiens', 'Chats', 'Rongeurs', 'Oiseaux', 'Poissons', 'Reptiles', 'Accessoires', 'Alimentation', 'Toilettage', 'Services'],
    fields: [
      { name: 'type', type: 'text', label: 'Type d\'animal/article', required: true },
      { name: 'breed', type: 'text', label: 'Race' },
      { name: 'age', type: 'text', label: 'Âge' },
      { name: 'gender', type: 'select', label: 'Genre', options: ['Mâle', 'Femelle'] },
      { name: 'vaccinated', type: 'boolean', label: 'Vacciné' },
      { name: 'pedigree', type: 'boolean', label: 'Pedigree' },
      { name: 'neutered', type: 'boolean', label: 'Stérilisé' },
    ]
  },
  {
    id: 'luxury',
    name: 'Luxe',
    icon: Watch,
    subcategories: ['Montres', 'Bijoux', 'Maroquinerie', 'Mode', 'Accessoires', 'Parfums', 'Vins', 'Art', 'Voitures', 'Immobilier'],
    fields: [
      { name: 'brand', type: 'text', label: 'Marque', required: true },
      { name: 'model', type: 'text', label: 'Modèle', required: true },
      { name: 'material', type: 'text', label: 'Matériau' },
      { name: 'condition', type: 'select', label: 'État', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état'] },
      { name: 'authenticity', type: 'boolean', label: 'Certificat d\'authenticité' },
      { name: 'year', type: 'number', label: 'Année' },
      { name: 'serialNumber', type: 'text', label: 'Numéro de série' },
    ]
  },
  {
    id: 'art',
    name: 'Art',
    icon: Palette,
    subcategories: ['Peinture', 'Sculpture', 'Photographie', 'Design', 'Antiquités', 'Art contemporain', 'Art numérique', 'Artisanat', 'Collections', 'Mobilier'],
    fields: [
      { name: 'artist', type: 'text', label: 'Artiste', required: true },
      { name: 'technique', type: 'text', label: 'Technique' },
      { name: 'dimensions', type: 'text', label: 'Dimensions' },
      { name: 'year', type: 'number', label: 'Année de création' },
      { name: 'style', type: 'select', label: 'Style', options: ['Moderne', 'Contemporain', 'Classique', 'Abstrait', 'Figuratif'] },
      { name: 'certificate', type: 'boolean', label: 'Certificat d\'authenticité' },
      { name: 'edition', type: 'text', label: 'Édition/Numérotation' },
    ]
  }
];