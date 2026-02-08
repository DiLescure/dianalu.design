import ShortUniqueId from 'short-unique-id';

export const uid = new ShortUniqueId();

export const codeUid = new ShortUniqueId({
  dictionary: 'alphanum_upper',
  length: 6,
});
