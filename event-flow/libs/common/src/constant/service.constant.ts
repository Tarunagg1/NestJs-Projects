export const SERVICES = {
    API_GATEWAY: 'api-gateway',
    AUTH_SERVICE: 'auth-service',
    USERS_SERVICE: 'users-service',
    EVENTS_SERVICE: 'events-service',
    TICKET_SERVICE: 'ticket-service',
    PAYMENTS_SERVICE: 'payments-service',
    NOTIFICATIONS_SERVICE: 'notifications-service'
} as const;

export const SERVICE_PORTS = {
    API_GATEWAY: 3000,
    AUTH_SERVICE: 3001,
    USERS_SERVICE: 3002,
    EVENTS_SERVICE: 3003,
    TICKET_SERVICE: 3004,
    PAYMENTS_SERVICE: 3005,
    NOTIFICATIONS_SERVICE: 3006
} as const;

export const SERVICE_HOSTNAMES = {
    API_GATEWAY: 'api-gateway.local',
    AUTH_SERVICE: 'auth-service.local',
    USERS_SERVICE: 'users-service.local',
    EVENTS_SERVICE: 'events-service.local',
    TICKET_SERVICE: 'ticket-service.local',
    PAYMENTS_SERVICE: 'payments-service.local',
    NOTIFICATIONS_SERVICE: 'notifications-service.local'
} as const;
