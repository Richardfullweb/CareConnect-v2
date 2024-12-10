import { createAppointmentMessage } from '../utils/messages';

// Exemplo de como criar uma mensagem de agendamento
async function createExampleAppointmentNotification() {
  const mariaJuliaId = "user123"; // ID da Maria Julia no sistema
  
  const appointmentData = {
    date: new Date("2024-12-10T20:15:00-03:00"),
    duration: 4, // em horas
    address: "R. Gen. Osório, 165 - Mogi das Cruzes, SP - CEP: 08.830-600",
    price: 260.00
  };

  // Criar mensagem de agendamento pendente
  await createAppointmentMessage(
    mariaJuliaId,
    'appointment_pending',
    appointmentData
  );
}

// Executar a função
createExampleAppointmentNotification()
  .then(() => console.log('Mensagem de agendamento criada com sucesso'))
  .catch((error) => console.error('Erro ao criar mensagem:', error));
