// utils/helpers.js
function safeJsonParse(str) {
    try {
      // Check if str is already an object
      if (typeof str === 'object' && str !== null) {
        return str;
      }
      return JSON.parse(str);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.log('Attempted to parse:', str);
      return null;
    }
  }

function generateSearchQuery(preferences) {
  let query = '';

  if (preferences.genres) {
    query += preferences.genres.join(' ');
  }
  if (preferences.themes) {
    query += ' ' + preferences.themes.join(' ');
  }
  if (preferences.settings) {
    query += ' ' + preferences.settings.join(' ');
  }

  return query.trim();
}

module.exports = {
  safeJsonParse,
  generateSearchQuery,
};
