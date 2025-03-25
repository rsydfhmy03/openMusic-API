exports.up = (pgm) => {
  pgm.createTable('authentications', {
    id: {
      type: 'VARCHAR(35)',
      primaryKey: true,
    },
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
// eslint-disable-next-line eol-last
};