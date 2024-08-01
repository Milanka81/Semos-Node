/**
 * @param {string} template Template string sa placeholderima
 * @param {Object} replacements  Objekat sa vrednostima za zamenu placeholdera
 * @returns {string}  Vraca HTML sa izvrsenim zamenama
 */

function generateHTML(template, replacements) {
  return template.replace(/{{(.*?)}}/g, (match, p1) => replacements[p1.trim()]);
}
module.exports = generateHTML;
