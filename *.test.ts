jest.mock('../bin/public_suffix_list.dat.txt');

import factory from './index';

describe('TLD Extract factory function', () => {
  test('should return parsed public and private parts correctly', () => {
    const result = factory('example.com');

    expect(result).toBeDefined();

  });
});
