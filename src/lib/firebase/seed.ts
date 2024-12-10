import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

const cuidadores = [
  {
    name: "Ana Paula",
    specialty: "Cuidador de Idosos",
    rating: 4.8,
    hourlyRate: 50,
    available: true,
    location: "São Paulo",
    experience: 5,
    description: "Profissional dedicada com experiência em cuidados especiais",
    photo: "https://example.com/photos/ana.jpg"
  },
  {
    name: "Carlos Silva",
    specialty: "Enfermeiro",
    rating: 4.9,
    hourlyRate: 65,
    available: true,
    location: "São Paulo",
    experience: 8,
    description: "Enfermeiro especializado em cuidados geriátricos",
    photo: "https://example.com/photos/carlos.jpg"
  },
  {
    name: "Maria Santos",
    specialty: "Cuidador de Idosos",
    rating: 4.7,
    hourlyRate: 45,
    available: true,
    location: "Rio de Janeiro",
    experience: 3,
    description: "Cuidadora com formação em primeiros socorros",
    photo: "https://example.com/photos/maria.jpg"
  }
];

export async function seedCuidadores() {
  try {
    const cuidadoresRef = collection(db, 'cuidadores');
    
    for (const cuidador of cuidadores) {
      await addDoc(cuidadoresRef, cuidador);
    }
    
    console.log('Cuidadores adicionados com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar cuidadores:', error);
  }
}
