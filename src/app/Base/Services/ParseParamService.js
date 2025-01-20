class ParseParamService {
  /**
   * Parse query parameters generically and return an object of filters.
   * @param {Object} query - The query object from the request.
   * @param {Array<string>} allowedFields - List of allowed fields for filtering.
   * @returns {Object} The filters object.
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
