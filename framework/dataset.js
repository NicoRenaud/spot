/**
 * A Dataset is responsible for actually managing the data: based on the filters and their factes,
 * implement callbacks that return the processed data in a standardized format.
 *
 * To help analyze data, a few methods to help autoconfigure your session must be implemented.
 *
 * Implementations for Crossfilter (fully in memory client side filtering) and PostgreSQL datasets are available.
 * @class Dataset
 */

var BaseModel = require('./util/base');
var Filters = require('./filter/collection');
var Facets = require('./facet/collection');

function getAllData (dataset) {
  if (dataset.isPaused) {
    return;
  }
  dataset.filters.forEach(function (filter, i) {
    if (filter.getData) {
      filter.getData();
    }
  });
}

function warnVirtualFuction () {
  console.error('Warning: function not implemented by dataset');
}

module.exports = BaseModel.extend({
  props: {
    /**
     * Name of the dataset
     * @memberof! Dataset
     * @type {string}
     */
    name: {
      type: 'string'
    },
    /**
     * URL, fi. to paper, dataset owner, etc.
     * @memberof! Dataset
     * @type {string}
     */
    URL: {
      type: 'string'
    },
    /**
     * Short description of the dataset
     * @memberof! Dataset
     * @type {string}
     */
    description: {
      type: 'string'
    },
    /**
     * If dataset is part of the current session
     * @memberof! Facet
     * @type {boolean}
     */
    isActive: ['boolean', false, false],
    /**
     * Type of the dataset: crossfilter, server, generic (none)
     * @memberof! Dataset
     * @readonly
     * @type {string}
     */
    datasetType: {
      type: 'string',
      setOnce: true,
      values: ['client', 'server', 'generic'],
      default: 'generic'
    },
    /**
     * Total number of datapoints in the current dataset
     * @memberof! Dataset
     * @readonly
     * @type {number}
     */
    dataTotal: ['number', true, 0],
    /**
     * Total number of datapoints that are currently selected
     * @memberof! Dataset
     * @readonly
     * @type {number}
     */
    dataSelected: ['number', true, 0],
    /**
     * editMode
     * When true, user can add and remove plots etc.
     * When false, interaction is with the content of the plot for selections etc.
     * @memberof! Dataset
     * @type {boolean}
     */
    editMode: ['boolean', true, true] // FIXME: make global
  },
  session: {
    /**
     * isPaused when true, calls to getAllData are ignored.
     * This is useful to suppres calls to getData
     * when adding and removing a number of filters at once.
     * @memberof! Dataset
     * @type {boolean}
     */
    isPaused: ['boolean', false, true]
  },
  collections: {
    /**
     * A Filter collection holding all active filters on the dataset
     * @memberof! Dataset
     * @type {Filter[]}
     */
    filters: Filters,
    /**
     * A Facet collection holding pre defined facets
     * @memberof! Dataset
     * @type {Facet[]}
     */
    facets: Facets
  },

  /**
   * Pause the dataset. This means calls to getData are blocked.
   * Useful when updating a lot of filters and you are not interested in the intermediate state.
   * @memberof Dataset
   */
  pause: function () {
    this.isPaused = true;
  },
  /**
   * Unpause the dataset
   * @memberof Dataset
   */
  play: function () {
    this.isPaused = false;
  },

  /**
   * getAllData
   * Refresh data for all filters, by calling getData for each filter in the filter collection.
   * @see pause and play
   * @memberof! Dataset
   * @function
   */
  getAllData: getAllData,

  /**
   * Autoconfigure a dataset:
   * 1. inspect the dataset, and create facets for the properties
   * 2. for continuous facets, guess the missing values, and set the minimum and maximum values
   * 3. for categorial facets, set the categorialTransform
   *
   * @memberof! Dataset
   * @function
   */
  scanData: warnVirtualFuction,

  // Functions for facets
  setMinMax: warnVirtualFuction,
  setCategories: warnVirtualFuction,
  setPercentiles: warnVirtualFuction,
  setExceedances: warnVirtualFuction,

  // Functions for filters
  initDataFilter: warnVirtualFuction,
  releaseDataFilter: warnVirtualFuction,
  updateDataFilter: warnVirtualFuction
});
