import mitt, { type EventType } from 'mitt';
import type { OverLayEvents } from '@/services/overlay/types';

export type AppEvents = Record<EventType, any> & OverLayEvents;

const eventService = mitt<AppEvents>();

export default eventService;
