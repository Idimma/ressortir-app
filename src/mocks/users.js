import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import sampleSize from 'lodash/sampleSize';

const users = [
  {
    id: 1,
    name: 'Ian B. Winburn',
    username: '@IanWinburn',
  },
  {
    id: 2,
    name: 'Rachel M. Williams',
    username: '@RachelWilliams',
  },
  {
    id: 3,
    name: 'Byron F. Young',
    username: '@ByronYoung',
  },
  {
    id: 4,
    name: 'Robert K. Tuttle',
    username: '@RobertTuttle',
  },
  {
    id: 5,
    name: 'Carolyn M. Witkowski',
    username: '@CarolynWitkowski',
  },
  {
    id: 6,
    name: 'Ramon C. Fairley',
    username: '@RamonFairley',
  },
  {
    id: 7,
    name: 'Sarah B. Miranda',
    username: '@SarahMiranda',
  },
  {
    id: 8,
    name: 'Jennifer T. Lucero',
    username: '@JenniferLucero',
  },
];

export const getUsers = () => shuffle(users);
export const getRandomUser = () => sample(users);
export const getNUsers = (n) => sampleSize(users, n);
export const getUserById = (id) => users.find((user) => user.id === id);
