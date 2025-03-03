import mockAxios from 'axios';

import Service from './service';

it('will set assigned filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.assigned()).toHaveProperty('filters', {
    assigned: true,
  });
});

it('will set assigned filter to false', async () => {
  const resource = new Service(mockAxios);

  expect(resource.assigned(false)).toHaveProperty('filters', {
    assigned: false,
  });
});

it('will set location filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('will set location filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.at('identifier')).toHaveProperty('filters', {
    location: 'identifier',
  });
});

it('will set user filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.by(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('will set user filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.by('identifier')).toHaveProperty('filters', {
    user: 'identifier',
  });
});

it('will set category filter using a number', async () => {
  const resource = new Service(mockAxios);

  expect(resource.in(1)).toHaveProperty('filters', {
    category: 1,
  });
});

it('will set category filter using a string', async () => {
  const resource = new Service(mockAxios);

  expect(resource.in('identifier')).toHaveProperty('filters', {
    category: 'identifier',
  });
});

it('will set the invite only filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.invitable()).toHaveProperty('filters', {
    invitable: 1,
  });
});

it('will set the group filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.group()).toHaveProperty('filters', {
    group: 1,
  });
});

it('will set the individual filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.individual()).toHaveProperty('filters', {
    group: 0,
  });
});

it('will set the page we are on', async () => {
  const resource = new Service(mockAxios);

  expect(resource.on(4)).toHaveProperty('page', 4);
});

it('will set the limit given', async () => {
  const resource = new Service(mockAxios);

  expect(resource.take(5)).toHaveProperty('limit', 5);
});

it('will set the sortable filter', async () => {
  const resource = new Service(mockAxios);

  expect(resource.sortBy('name,-created')).toHaveProperty('sortable', 'name,-created');
});

it('can string all filterable options together', async () => {
  const resource = new Service(mockAxios);

  const expected = expect(
    resource
      .assigned()
      .at(1)
      .by(2)
      .in(3)
      .invitable()
      .individual()
      .sortBy('created')
      .take(5)
      .on(1),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
    category: 3,
    group: 0,
    invitable: 1,
    location: 1,
    user: 2,
  });
  expected.toHaveProperty('sortable', 'created');
  expected.toHaveProperty('limit', 5);
  expected.toHaveProperty('page', 1);
});

it('can get services without additional parameters', async () => {
  const resource = new Service(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('services', { params: {} });
});

it('can get services with additional parameters', async () => {
  const resource = new Service(mockAxios);

  await resource
    .assigned()
    .at(1)
    .by(2)
    .in(3)
    .invitable()
    .individual()
    .sortBy('created')
    .take(5)
    .on(1)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('services', {
    params: {
      'filter[assignments]': true,
      'filter[category]': 3,
      'filter[group]': 0,
      'filter[invite_only]': 1,
      'filter[location]': 1,
      'filter[user]': 2,
      limit: 5,
      page: 1,
      sort: 'created',
    },
  });
});

it('can conditionally set a filter', async () => {
  const resource = new Service(mockAxios);

  const expected = expect(
    resource.when(true, (service: Service) => service.assigned()),
  );

  expected.toHaveProperty('filters', {
    assigned: true,
  });
});

it('can conditionally not set a filter', async () => {
  const resource = new Service(mockAxios);

  const expected = expect(
    resource.when(false, (service: Service) => service.assigned()),
  );

  expected.toHaveProperty('filters', {});
});
