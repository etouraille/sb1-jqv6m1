import { Report } from '../types';

export const sampleReports: Report[] = [
  {
    id: '1',
    type: 'ad',
    targetId: '123',
    title: 'Annonce suspecte',
    description: 'Cette annonce semble être une arnaque',
    reporter: 'John Doe',
    status: 'pending',
    createdAt: new Date('2024-03-15T10:30:00Z')
  },
  {
    id: '2',
    type: 'user',
    targetId: '456',
    title: 'Utilisateur suspect',
    description: 'Comportement suspect, plusieurs signalements',
    reporter: 'Marie Dupont',
    status: 'pending',
    createdAt: new Date('2024-03-15T09:15:00Z')
  },
  {
    id: '3',
    type: 'ad',
    targetId: '789',
    title: 'Contenu inapproprié',
    description: 'Images inappropriées dans l\'annonce',
    reporter: 'Pierre Martin',
    status: 'pending',
    createdAt: new Date('2024-03-14T16:45:00Z')
  },
  {
    id: '4',
    type: 'message',
    targetId: '012',
    title: 'Harcèlement',
    description: 'Messages insistants et inappropriés',
    reporter: 'Sophie Bernard',
    status: 'pending',
    createdAt: new Date('2024-03-14T14:20:00Z')
  }
];