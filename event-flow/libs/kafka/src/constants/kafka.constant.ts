export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'eventflowapp';
export const KAFKA_CONSUMER_GROUP = process.env.KAFKA_CONSUMER_GROUP || 'eventflowgroup';



export const KAFKA_TOPIC = {
    USER_REGISTERED: 'user.registered',
    USER_LOGIN: 'user.login',
    PASSWORD_RESET_REQUESTED: 'user.password-reset-requested',


    EVENT_CREATED: 'event.created',
    EVENT_UPDATED: 'event.updated',
    EVENT_DELETED: 'event.deleted',
    EVENT_CANCELED: 'event.canceled',


    TICKET_PURCHASED: 'ticket-purchased',
    TICKET_CANCELLED: 'ticket-canceled',
    TICKET_CHECKED_IN: 'ticket-checked-in',


    PAYMENT_COMPLETED: 'payment.completed',
    PAYMENT_FAILED: 'payment.failed',
    PAYMENT_REFUNDED: 'payment.refunded',


    SEND_EMAIL: 'notification.send-email',
    SEND_PUSH: 'notification.send-push',
} as const;


export type KafkaTopics = (typeof KAFKA_TOPIC)[keyof typeof KAFKA_TOPIC];
