import { AxiosInstance } from 'axios';

import { Resource } from '../index';
import Conditional, { ConditionalResource } from './conditional';

export interface TimeSlotFilter {
  end?: string;
  location?: number;
  services?: number | number[];
  start?: string;
  timezone?: string;
  locales?: string[];
  user?: number;
}

export interface TimeSlotParameters {
  end?: string;
  location_id?: number;
  service_id?: number | number[];
  staff_id?: number;
  start?: string;
  supported_locales?: string[];
  timezone?: string;
}

export interface TimeSlotResource extends Resource, ConditionalResource {
  at(location: number): this;

  between(start: string, end: string): this;

  by(user: number): this;

  for(services: number | number[]): this;

  in(timezone: string): this;

  supporting(locales: string[]): this;
}

export default class TimeSlot extends Conditional implements TimeSlotResource {
  protected client: AxiosInstance;
  protected filters: TimeSlotFilter;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.filters = {};
  }

  public at(location: number): this {
    this.filters.location = location;

    return this;
  }

  public between(start: string, end: string): this {
    this.filters.start = start;
    this.filters.end = end;

    return this;
  }

  public by(user: number): this {
    this.filters.user = user;

    return this;
  }

  public for(services: number | number[]): this {
    this.filters.services = services;

    return this;
  }

  public async get(): Promise<any> {
    const params: TimeSlotParameters = {
      end: this.filters.end,
      location_id: this.filters.location,
      service_id: this.filters.services,
      start: this.filters.start,
    };

    if (this.filters.locales) {
      params.supported_locales = this.filters.locales;
    }

    if (this.filters.timezone) {
      params.timezone = this.filters.timezone;
    }

    if (this.filters.user) {
      params.staff_id = this.filters.user;
    }

    return await this.client.get('times', { params });
  }

  public in(timezone: string): this {
    this.filters.timezone = timezone;

    return this;
  }

  public supporting(locales: string[]): this {
    this.filters.locales = locales;

    return this;
  }
}
