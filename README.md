# Coconut Open API JS SDK

[![npm Version][ico-version]][link-npm]
[![Software License][ico-license]](LICENSE.md)
[![Build Status][ico-travis]][link-travis]
[![Coverage Status][ico-codecov]][link-codecov]
[![npm downloads][ico-downloads]][link-downloads]

## Install

Using npm:

```bash
$ npm install coconut-open-api-js
```

Using yarn:

```bash
$ yarn add coconut-open-api-js
```

## Official Documentation

Documentation for the Open API can be found on the [Developer Portal][link-developers].

## Usage

### Answers

##### Methods

- `for(question: number)`

Set an attribute to determine the identifier of the question being answer.

- `is(value: string)`

Set an attribute to determine the actual answer's value.

##### Example

```javascript
import { Answer } from 'coconut-open-api-js';

class Answers {
  static create({ question, value }) {
    return (new Answer())
      .for(question)
      .is(value);
  }
}
```

### Appointments

##### Methods

- `at(location: number)`

Set a relationship which will tell the API to use the given location identifier when creating an appointment.

- `book()`

Create a new appointment using the pre-set parameters.

- `by(user: number)`

Set a relationship which will tell the API to use the given user identifier when creating an appointment.

- `cancel(appointment: number, attendee: number)`

Cancel an appointment for a specific attendee matching the given appointment and attendee identifiers.

- `for(services: number | numbers[])`

Set a relationship which will tell the API to use the given service identifier when creating an appointment.

- `get()`

Find an appointment matching the pre-set matching parameters.

- `matching(matchers: AppointmentMatcherParameters)`

Set a filter to use in order to find an existing appointment.

- `notify(notifications: AppointmentNotificationParameters)`

Set a filter to determine who should be notified when booking an appointment.

- `starting(start: string)`

Set an attribute which will tell the API to use the given start date time string as the start time of the new appointment.

- `source(source: string)`

Set an attribute which will tell the API to use the given source string as the source when creating an appointment (ie. the UTM source)

- `via(invitation: number)`

Set an attribute which will tell the API to use the given invitation identifier when creating an appointment.

- `with(attendees: AttendeeModel | AttendeeModel[])`

Set a relationship which will tell the API to use the given attendee model(s) when creating a new appointment.

##### Example

```javascript
import { OpenApi, Attendee, Answer, Response } from 'coconut-open-api-js';

class Appointments {
  constructor() {
    this.api = new OpenApi();
  }

  async book(attributes) {
    const {
      address, city, country, email, firstName, invitation, language, lastName,
      location, notes, phone, question, service, source, start, user, value,
    } = attributes;

    const answer = (new Answer())
      .for(question)
      .is(value);
    const attendee = (new Attendee())
      .answers(answer)
      .located({ address, city, country })
      .messagable()
      .named(firstName, lastName)
      .provided(notes)
      .reachable({ phone, email })
      .speaks(language);

    return this.api
      .appointments()
      .at(location)
      .by(user)
      .for(service)
      .starting(start)
      .source(source)
      .via(invitation)
      .with(attendee)
      .notify({
        user: true,
        client: true,
      })
      .book();
  }

  async cancel(attributes) {
    const { appointment, attendee } = attributes;

    // We can optionally submit custom form responses when cancelling
    // appointments by utilizing the Response and Attendee models.
    const person = (new Attendee())
      .as(attendee)
      .responses([
        (new Response()).for(1).is('an answer'),
        (new Response()).for(2).selected(1),
      ]);

    return this.api.appointments()
      .with(person)
      .cancel(appointment, attendee);
  }

  async fetch({ code, email, id }) {
    return this.api.appointments().matching({ code, email, id }).get();
  }
}
```

### Attendees

##### Methods

- `answers(answers: AnswerModel | AnswerModel[])`

Set a relationship which will tell the API to use the given answer model(s) for the attendee when booking an appointment.

- `as(identifier: number)`

Set the identifier for a given attendee. _(not publicly available yet)_

- `located(details: LocatableDetailParameters)`

Set certain attributes on the attendee related to location details such as address and city.

- `messageable()`

Set a flag on the attendee which determines that they have opted to receive sms messages.

- `named(first: string, last: string)`

Set the first and last name of the attendee.

- `provided(notes: string)`

Set any additional details the attendee has provided when booking an appointment.

- `reachable(details: ReachableDetailParameters)`

Set certain attributes on the attendee related to contact details such as cell phone and email.

- `responses(answers: ResponseModel | ResponseModel[])`

Set a relationship which will tell the API to use the given response model(s) for the attendee when cancelling an appointment. _(not publicly available yet)_

- `speaks(language: string)`

Set the preferred locale of the attendee.

##### Example

```javascript
import { Attendee, Answer } from 'coconut-open-api-js';

class Attendees {
  static create(attributes) {
    const {
      address, city, country, firstName, lastName,
      notes, phone, email, language, question, value
    } = attributes;

    const answer = (new Answer()).for(question).is(value);

    return (new Attendee())
      .answers(answer)
      .located({ address, city, country })
      .messagable()
      .named(firstName, lastName)
      .provided(notes)
      .reachable({ phone, email })
      .speaks(language);
  }
}
```

### Forms

##### Methods

- `cancellations()`

Set a filter which will tell the API to return only cancellation forms. _(not publicly available yet)_

- `get()`

Send the API request using the pre-set filters. _(not publicly available yet)_

- `on(page: number)`

Set the page offset which you want to view. _(not publicly available yet)_

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted. _(not publicly available yet)_

- `take(limit: number)`

Set the limit which you want returned. _(not publicly available yet)_

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Forms {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ limit, page, sortable }) {
    return await this.api
      .forms()
      .cancellations()
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get()
  }
}
```

### Locations

##### Methods

- `assigned(assigned: boolean = true)`

Set a filter which will tell the API to return locations that have public user and service assignments.

- `containing(user: number | string)`

Set a filter which will tell the API to return locations where the supplied user identifier is assigned.

- `details(identifier: string)`

Retrieve a given location's details based on the given identifier. _(not publicly available yet)_

- `get()`

Send the API request using the pre-set filters.

- `invitable()`

Set a filter which will tell the API to return locations that are specifically invite only.

- `located(details: LocatableLocationParameters)`

Set certain filters which will tell the API to return locations that match the locatable details you provide.

- `on(page: number)`

Set the page offset which you want to view.

- `physical()`

Set a filter which will tell the API to return only non-virtual locations. _(not publicly available yet)_

- `providing(services: number | number[] | string | string[])`

Set a filter which will tell the API to return locations where the supplied service identifier(s) is / are assigned.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `suggest(query: string)`

Retrieve a set of location suggestions based on the given query. _(not publicly available yet)_

- `take(limit: number)`

Set the limit which you want returned.

- `virtual()`

Set a filter which will tell the API to return only virtual locations. _(not publicly available yet)_

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Locations {
  constructor() {
    this.api = new OpenApi();
  }

  async details(identifier) {
    return await this.api.details(identifier);
  }

  async get({ page, limit, services, sortable, user }) {
    return await this.api
      .locations()
      .assigned()
      .containing(user)
      .invitable()
      .providing(services)
      .physical()
      .sortBy(sortable)
      .on(page)
      .take(limit)
      .get();
  }
  
  async suggestions(query) {
    return await this.api.suggest(query);
  }
}
```

### Preferences

##### Methods

- `between(start: string, end: string)`

Set the attributes to determine the start and end time of the wait list request preference.

- `next()`

Set an attribute to say that the preference is for the next available opening.

- `on(day: number)`

Set the attribute to determine the preferred day of the wait list request preference and that it should only be for the certain supplied days. 

##### Example

```javascript
import { Preference } from 'coconut-open-api-js';

class Preferences {
  static create({ day, start, end }) {
    return (new Preference()).between(start, end).on(day);
  }
}
```

### Questions

##### Methods

- `for(services: number | number[] | string | string[])`

Set a filter which will tell the API to return questions which are specifically assigned to the given service identifier(s).

- `get()`

Send the API request using the pre-set filters.

- `on(page: number)`

Set the page offset which you want to view.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `take(limit: number)`

Set the limit which you want returned.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Questions {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ limit, page, services, sortable }) {
    return await this.api
      .questions()
      .for(services)
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get()
  }
}
```

### Responses

##### Methods

- `for(question: number)`

Set an attribute to determine the identifier of the question being answer. _(not publicly available yet)_

- `is(value: string)`

Set an attribute to determine the actual answer's value. _(not publicly available yet)_

##### Example

```javascript
import { Response } from 'coconut-open-api-js';

class Responses {
  static create({ question, value }) {
    return (new Response())
      .for(question)
      .is(value);
  }

  static select({ question, option }) {
    return (new Response())
      .for(question)
      .selected(option);
  }
}
```

### Services

##### Methods

- `assigned(assigned: boolean = true)`

Set a filter which will tell the API to return services that have public user and location assignments.

- `at(location: number | string)`

Set a filter which will tell the API to return services that are provided at the location matching the provided identifier.

- `by(user: number | string)`

Set a filter which will tell the API to return services that are provided by the user matching the provided identifier.

- `get()`

Send the API request using the pre-set filters.

- `group()`

Set a filter which will tell the API to return only group type services. _(not publicly available yet)_

- `in(category: number | string)`

Set a filter which will tell the API to return services that match the given category identifier.

- `individual()`

Set a filter which will tell the API to return only individual type services. _(not publicly available yet)_

- `invitable()`

Set a filter which will tell the API to return services that are specifically invite only.

- `on(page: number)`

Set the page offset which you want to view.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `take(limit: number)`

Set the limit which you want returned.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Services {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ category, limit, location, page, sortable, user }) {
    return await this.api
      .services()
      .assigned()
      .at(location)
      .by(user)
      .in(category)
      .invitable()
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get()
  }
}
```

### Settings

##### Methods

- `get()`

Send the API request.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Settings {
  constructor() {
    this.api = new OpenApi();
  }

  async get() {
    return await this.api.settings().get();
  }
}
```

### Time Slots

##### Methods

- `at(location: number)`

Set a filter which will tell the API to return time slots at the location matching the provided identifier.

- `between(start: string, end: string)`

Set a filter which will tell the API to return time slots between a given start and end date time string.

- `by(user: number)`

Set a filter which will tell the API to return time slots that are specifically for the user matching the provided identifier.

- `for(services: number | number[])`

Set a filter which will tell the API to return time slots that are specifically for the service(s) matching the provided identifier(s).

- `get()`

Send the API request using the pre-set filters.

- `in(timezone: string)`

Set a filter which will tell the API to return time slots in the given timezone. _(not publicly available yet)_

- `supporting(locales: string[])`

Set a filter which will tell the API to return time slots for users that support the given locales. _(not publically available yet)_

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class TimeSlots {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ end, location, service, start, user }) {
    return await this.api
      .slots()
      .at(location)
      .by(user)
      .for(service)
      .between(start, end)
      .in('America/Chicago')
      .supporting(['en', 'fr', 'es'])
      .get()
  }
}
```

### Users

##### Methods

- `assigned(assigned: boolean = true)`

Set a filter which will tell the API to return users that have public location and service assignment.

- `at(location: number | string)`

Set a filter which will tell the API to return users that are assigned at the location matching the provided identifier.

- `find(user: number | string)`

Set a filter which will tell the API to return a user matching the provided identifier.

- `get()`

Send the API request using the pre-set filters.

- `on(page: number)`

Set the page offset which you want to view.

- `performing(services: number | number[] | string | string[])`

Set a filter which will tell the API to return users that are assigned to the service(s) matching the provided identifier(s).

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `take(limit: number)`

Set the limit which you want returned.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Users {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ limit, location, page, services, sortable }) {
    return await this.api
      .users()
      .assigned()
      .at(location)
      .performing(services)
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get();
  }
}
```

### Wait Lists

##### Methods

- `add()`

Create a new wait list request using the pre-set parameters.

- `at(location: number | string)`

Set a relationship which will tell the API to use the given location identifier when creating or updating a wait list request.

- `belonging(client: number | string)`

Set a parameter which will tell the API to use the given client identifier when looking for an existing wait list request.

- `find(list: number | string)`

Find an existing wait list request matching the given identifier.

- `for(attendee: AttendeeModel)`

Set a relationship which will tell the API to use the given attendee model when creating or updating a wait list request.

- `include(includes: string)`

Set an inclusion parameter to include other relationships when fetching an existing wait list request.

- `prefers(preferences: PreferenceModel | PreferenceModel[])`

Set a relationship which will tell the API to use the given preference model(s) when creating or updating a wait list request.

- `provided(notes: string)`

Set an attribute which will tell the API to use the given notes as additional details when creating or updating a wait list request.

- `remove(list: number | string)`

Remove a pre-set client's wait list request that matches the given identifier.

- `seeking(service: number | string)`

Set a relationship which will tell the API to use the service identifier when creating or updating a wait list request.

- `update(list: number | string)`

Update the wait list request matching the given identifier with pre-set attributes / relationships.

- `with(user: number | string)`

Set a relationship which will tell the API to use the user identifier when creating or updating a wait list request.

##### Example

```javascript
import { OpenApi, Attendee, Preference } from 'coconut-open-api-js';

class WaitLists {
  constructor() {
    this.api = new OpenApi();
  }

  async add({ firstName, lastName, email, day, start, end, location, service, user, notes }) {
    const attendee = (new Attendee()).named({ firstName, lastName }).reachable({ email });
    const preference = (new Preference()).on(day).between(start, end);

    return this.api
      .lists()
      .for(attendee)
      .at(location)
      .seeking(service)
      .with(user)
      .provided(notes)
      .prefers(preference)
      .add();
  }

  async find({ client, inclusions, list }) {
    return this.api
      .lists()
      .belonging(client)
      .include(inclusions)
      .find(list);
  }

  async remove({ client, list }) {
    return this.api.lists().belonging(client).remove(list);
  }

  async update({ client, list, notes, user }) {
    const preference = (new Preference()).next();

    return this.api
      .lists()
      .belonging(client)
      .with(user)
      .prefers(preference)
      .provided(notes)
      .update(list);
  }
}
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Testing

```bash
$ yarn run test
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[ico-version]: https://img.shields.io/npm/v/coconut-open-api-js.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/coconutcalendar/coconut-open-api-js/master.svg?style=flat-square
[ico-codecov]: https://codecov.io/gh/coconutcalendar/coconut-open-api-js/branch/master/graph/badge.svg
[ico-downloads]: https://img.shields.io/npm/dt/coconut-open-api-js.svg?style=flat-square

[link-npm]: https://www.npmjs.org/package/coconut-open-api-js
[link-travis]: https://travis-ci.org/coconutcalendar/coconut-open-api-js
[link-codecov]: https://codecov.io/gh/coconutcalendar/coconut-open-api-js
[link-downloads]: http://npm-stat.com/charts.html?package=coconut-open-api-js
[link-developers]: https://developers.coconutsoftware.com/docs/v2/api/open-appointments
