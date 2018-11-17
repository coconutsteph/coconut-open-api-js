import { AnswerModel, AttendeeModel } from '../types/models';
import { AttendeeParameters, LocationDetailParameters, ReachableDetailParameters } from '../types/parameters';
import Model from './model';

export default class Attendee extends Model implements AttendeeModel {
  protected attributes: AttendeeParameters;

  constructor() {
    super();

    this.attributes = {
      email: null,
      first_name: null,
      last_name: null,
    };
  }

  public answers(answers: AnswerModel | AnswerModel[]): this {
    this.attributes.answers = Array.isArray(answers) ? answers : [answers];

    return this;
  }

  public located(details: LocationDetailParameters): this {
    this.attributes = {...this.attributes, ...details};

    return this;
  }

  public messagable(): this {
    this.attributes.messagable = true;

    return this;
  }

  public named(first: string, last: string): this {
    return this;
  }

  public provided(notes: string): this {
    return this;
  }

  public reachable(details: ReachableDetailParameters): this {
    return this;
  }

  public speaks(lang: string): this {
    return this;
  }
}