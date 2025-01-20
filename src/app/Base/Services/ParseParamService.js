/**
 * ParseParamService provides utility functions to parse query parameters from HTTP requests.
 * It filters and processes query parameters based on allowed fields.
 * This class is useful for sanitizing and extracting valid query parameters in RESTful APIs.
 */
class ParseParamService {
  /**
   * Parses the query parameters from the request and returns an object of filters.
   * Only the allowed fields are included in the resulting filters object.
   *
   * @param {Object} query - The query object from the HTTP request. This typically comes from `req.query` in Hapi.
   *   The query object contains key-value pairs of the query parameters.
   * @param {Array<string>} allowedFields - An array of field names that are allowed to be used for filtering.
   *   Only the keys that exist in both the `query` object and the `allowedFields` array will be included in the `filters` object.
   * @returns {Object} An object containing the filtered query parameters.
   *   The keys are the allowed fields, and the values are the corresponding query parameter values.
   * @throws {Error} If no valid fields are provided in the query or the query object is malformed.
   */
  static parseQueryParams(query, allowedFields) {
    const filters = {};
    Object.keys(query).forEach((key) => {
      if (allowedFields.includes(key) && query[key]) {
        filters[key] = query[key];
      }
    });
    return filters;
  }
}

module.exports = ParseParamService;
