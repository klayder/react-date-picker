"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _Divider = _interopRequireDefault(require("./Divider"));

var _DayInput = _interopRequireDefault(require("./DateInput/DayInput"));

var _MonthInput = _interopRequireDefault(require("./DateInput/MonthInput"));

var _YearInput = _interopRequireDefault(require("./DateInput/YearInput"));

var _NativeInput = _interopRequireDefault(require("./DateInput/NativeInput"));

var _dateFormatter = require("./shared/dateFormatter");

var _dates = require("./shared/dates");

var _propTypes2 = require("./shared/propTypes");

var _utils = require("./shared/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var defaultMinDate = new Date(-8.64e15);
var defaultMaxDate = new Date(8.64e15);
var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var datesAreDifferent = function datesAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1.getTime() !== date2.getTime();
};
/**
 * Returns value type that can be returned with currently applied settings.
 */


var getValueType = function getValueType(maxDetail) {
  return allValueTypes[allViews.indexOf(maxDetail)];
};

var getValueFrom = function getValueFrom(value) {
  if (!value) {
    return null;
  }

  var rawValueFrom = value instanceof Array && value.length === 2 ? value[0] : value;

  if (!rawValueFrom) {
    return null;
  }

  var valueFromDate = new Date(rawValueFrom);

  if (isNaN(valueFromDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }

  return valueFromDate;
};

var getDetailValueFrom = function getDetailValueFrom(value, minDate, maxDate, maxDetail) {
  var valueFrom = getValueFrom(value);

  if (!valueFrom) {
    return null;
  }

  var detailValueFrom = (0, _dates.getBegin)(getValueType(maxDetail), valueFrom);
  return (0, _utils.between)(detailValueFrom, minDate, maxDate);
};

var getValueTo = function getValueTo(value) {
  if (!value) {
    return null;
  }

  var rawValueTo = value instanceof Array && value.length === 2 ? value[1] : value;

  if (!rawValueTo) {
    return null;
  }

  var valueToDate = new Date(rawValueTo);

  if (isNaN(valueToDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }

  return valueToDate;
};

var getDetailValueTo = function getDetailValueTo(value, minDate, maxDate, maxDetail) {
  var valueTo = getValueTo(value);

  if (!valueTo) {
    return null;
  }

  var detailValueTo = (0, _dates.getEnd)(getValueType(maxDetail), valueTo);
  return (0, _utils.between)(detailValueTo, minDate, maxDate);
};

var getDetailValueArray = function getDetailValueArray(value, minDate, maxDate, maxDetail) {
  if (value instanceof Array) {
    return value;
  }

  return [getDetailValueFrom(value, minDate, maxDate, maxDetail), getDetailValueTo(value, minDate, maxDate, maxDetail)];
};

var findPreviousInput = function findPreviousInput(element) {
  var previousElement = element.previousElementSibling; // Divider between inputs

  if (!previousElement) {
    return null;
  }

  return previousElement.previousElementSibling; // Actual input
};

var findNextInput = function findNextInput(element) {
  var nextElement = element.nextElementSibling; // Divider between inputs

  if (!nextElement) {
    return null;
  }

  return nextElement.nextElementSibling; // Actual input
};

var focus = function focus(element) {
  return element && element.focus();
};

var _renderCustomInputs = function renderCustomInputs(placeholder, elementFunctions) {
  var pattern = new RegExp(Object.keys(elementFunctions).join('|'), 'gi');
  var matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce(function (arr, element, index) {
    var divider = element && // eslint-disable-next-line react/no-array-index-key
    _react.default.createElement(_Divider.default, {
      key: "separator_".concat(index)
    }, element);

    var res = [].concat(_toConsumableArray(arr), [divider]);

    if (matches && matches[index]) {
      res.push(elementFunctions[matches[index]]());
    }

    return res;
  }, []);
};

var DateInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DateInput, _PureComponent);

  function DateInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      year: null,
      month: null,
      day: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (event) {
      if (event.target === event.currentTarget) {
        // Wrapper was directly clicked
        var _event$target$childre = _slicedToArray(event.target.children, 2),

        /* nativeInput */
        firstInput = _event$target$childre[1];

        focus(firstInput);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          {
            event.preventDefault();
            var input = event.target;
            var previousInput = findPreviousInput(input);
            focus(previousInput);
            break;
          }

        case 'ArrowRight':
        case _this.divider:
          {
            event.preventDefault();
            var _input = event.target;
            var nextInput = findNextInput(_input);
            focus(nextInput);
            break;
          }

        default:
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      if (Number.isNaN(+value)) {
        return null;
      }

      var item = '';

      switch (name) {
        case 'year':
          item = "".concat(value).slice(-4);
          break;

        case 'day':
          item = "".concat(value).slice(-2);
          break;

        case 'month':
          item = "".concat(value).slice(-2);
          break;

        default:
      }

      return _this.setState(_defineProperty({}, name, value ? item : null), _this.onChangeExternal);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeNative", function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;

      if (!onChange) {
        return;
      }

      var processedValue = function () {
        if (!value) {
          return null;
        }

        var _value$split = value.split('-'),
            _value$split2 = _slicedToArray(_value$split, 3),
            yearString = _value$split2[0],
            monthString = _value$split2[1],
            dayString = _value$split2[2];

        var year = parseInt(yearString, 10);
        var monthIndex = parseInt(monthString, 10) - 1 || 0;
        var date = parseInt(dayString, 10) || 1;
        return new Date(year, monthIndex, date);
      }();

      onChange(processedValue, false);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangeExternal", function () {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput].filter(Boolean);
      var values = {};
      formElements.forEach(function (formElement) {
        values[formElement.name] = formElement.value;
      });

      if (formElements.every(function (formElement) {
        return !formElement.value;
      })) {
        onChange(null, false);
      } else if (formElements.every(function (formElement) {
        return formElement.value && formElement.checkValidity();
      }) && values.year.length === 4) {
        var proposedValue = new Date(values.year, (values.month || 1) - 1, values.day || 1);

        var processedValue = _this.getProcessedValue(proposedValue);

        onChange(processedValue, false);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderDay", function () {
      var _this$props = _this.props,
          maxDetail = _this$props.maxDetail,
          showLeadingZeros = _this$props.showLeadingZeros;
      var _this$state = _this.state,
          value = _this$state.day,
          month = _this$state.month,
          year = _this$state.year;
      return _react.default.createElement(_DayInput.default, _extends({
        key: "day"
      }, _this.commonInputProps, {
        maxDetail: maxDetail,
        month: month,
        showLeadingZeros: showLeadingZeros,
        value: value,
        year: year
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderMonth", function () {
      var _this$props2 = _this.props,
          maxDetail = _this$props2.maxDetail,
          showLeadingZeros = _this$props2.showLeadingZeros;
      var _this$state2 = _this.state,
          value = _this$state2.month,
          year = _this$state2.year;
      return _react.default.createElement(_MonthInput.default, _extends({
        key: "month"
      }, _this.commonInputProps, {
        maxDetail: maxDetail,
        showLeadingZeros: showLeadingZeros,
        value: value,
        year: year
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderYear", function () {
      var year = _this.state.year;
      return _react.default.createElement(_YearInput.default, _extends({
        key: "year"
      }, _this.commonInputProps, {
        value: year,
        valueType: _this.valueType
      }));
    });

    return _this;
  }

  _createClass(DateInput, [{
    key: "getProcessedValue",

    /**
     * Gets current value in a desired format.
     */
    value: function getProcessedValue(value) {
      var _this$props3 = this.props,
          minDate = _this$props3.minDate,
          maxDate = _this$props3.maxDate,
          maxDetail = _this$props3.maxDetail,
          returnValue = _this$props3.returnValue;

      switch (returnValue) {
        case 'start':
          return getDetailValueFrom(value, minDate, maxDate, maxDetail);

        case 'end':
          return getDetailValueTo(value, minDate, maxDate, maxDetail);

        case 'range':
          return getDetailValueArray(value, minDate, maxDate, maxDetail);

        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: "renderCustomInputs",
    value: function renderCustomInputs() {
      var placeholder = this.placeholder;
      var elementFunctions = {
        day: this.renderDay,
        month: this.renderMonth,
        year: this.renderYear
      };
      return _renderCustomInputs(placeholder, elementFunctions);
    }
  }, {
    key: "renderNativeInput",
    value: function renderNativeInput() {
      var _this$props4 = this.props,
          disabled = _this$props4.disabled,
          maxDate = _this$props4.maxDate,
          minDate = _this$props4.minDate,
          name = _this$props4.name,
          required = _this$props4.required,
          value = _this$props4.value;
      return _react.default.createElement(_NativeInput.default, {
        key: "date",
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        name: name,
        onChange: this.onChangeNative,
        required: required,
        value: value,
        valueType: this.valueType
      });
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react.default.createElement("div", {
        className: className,
        onClick: this.onClick,
        role: "presentation"
      }, this.renderNativeInput(), this.renderCustomInputs());
    }
  }, {
    key: "formatDate",
    get: function get() {
      var _this$props5 = this.props,
          locale = _this$props5.locale,
          maxDetail = _this$props5.maxDetail;
      var options = {
        year: 'numeric'
      };
      var level = allViews.indexOf(maxDetail);

      if (level >= 2) {
        options.month = 'numeric';
      }

      if (level >= 3) {
        options.day = 'numeric';
      }

      return (0, _dateFormatter.getFormatter)(locale, options);
    }
  }, {
    key: "formatNumber",
    get: function get() {
      var locale = this.props.locale;
      var options = {
        useGrouping: false
      };
      return (0, _dateFormatter.getFormatter)(locale, options);
    }
  }, {
    key: "divider",
    get: function get() {
      var date = new Date(2017, 11, 11);
      return this.formatDate(date).match(/[^0-9]/)[0];
    }
  }, {
    key: "placeholder",
    get: function get() {
      var year = 2017;
      var monthIndex = 11;
      var day = 11;
      var date = new Date(year, monthIndex, day);
      return this.formatDate(date).replace(this.formatNumber(year), 'year').replace(this.formatNumber(monthIndex + 1), 'month').replace(this.formatNumber(day), 'day');
    }
  }, {
    key: "commonInputProps",
    get: function get() {
      var _this2 = this;

      var _this$props6 = this.props,
          className = _this$props6.className,
          disabled = _this$props6.disabled,
          isCalendarOpen = _this$props6.isCalendarOpen,
          maxDate = _this$props6.maxDate,
          minDate = _this$props6.minDate,
          required = _this$props6.required;
      return {
        className: className,
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        // This is only for showing validity when editing
        required: required || isCalendarOpen,
        itemRef: function itemRef(ref, name) {
          // Save a reference to each input field
          _this2["".concat(name, "Input")] = ref;
        }
      };
    }
  }, {
    key: "valueType",
    get: function get() {
      var maxDetail = this.props.maxDetail;
      return getValueType(maxDetail);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var minDate = nextProps.minDate,
          maxDate = nextProps.maxDate,
          maxDetail = nextProps.maxDetail;
      var nextState = {};
      /**
       * If isCalendarOpen flag has changed, we have to update it.
       * It's saved in state purely for use in getDerivedStateFromProps.
       */

      if (nextProps.isCalendarOpen !== prevState.isCalendarOpen) {
        nextState.isCalendarOpen = nextProps.isCalendarOpen;
      }
      /**
       * If the next value is different from the current one  (with an exception of situation in
       * which values provided are limited by minDate and maxDate so that the dates are the same),
       * get a new one.
       */


      var nextValue = getDetailValueFrom(nextProps.value, minDate, maxDate, maxDetail);
      var values = [nextValue, prevState.value];

      if ( // Toggling calendar visibility resets values
      nextState.isCalendarOpen // Flag was toggled
      || datesAreDifferent.apply(void 0, _toConsumableArray(values.map(function (value) {
        return getDetailValueFrom(value, minDate, maxDate, maxDetail);
      }))) || datesAreDifferent.apply(void 0, _toConsumableArray(values.map(function (value) {
        return getDetailValueTo(value, minDate, maxDate, maxDetail);
      })))) {
        if (nextValue) {
          nextState.year = (0, _dates.getYear)(nextValue);
          nextState.month = (0, _dates.getMonth)(nextValue);
          nextState.day = (0, _dates.getDay)(nextValue);
        } else {
          nextState.year = null;
          nextState.month = null;
          nextState.day = null;
        }

        nextState.value = nextValue;
      }

      return nextState;
    }
  }]);

  return DateInput;
}(_react.PureComponent);

exports.default = DateInput;
DateInput.defaultProps = {
  maxDetail: 'month',
  name: 'date',
  returnValue: 'start'
};
DateInput.propTypes = {
  className: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  isCalendarOpen: _propTypes.default.bool,
  locale: _propTypes.default.string,
  maxDate: _propTypes2.isMaxDate,
  maxDetail: _propTypes.default.oneOf(allViews),
  minDate: _propTypes2.isMinDate,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func,
  returnValue: _propTypes.default.oneOf(['start', 'end', 'range']),
  required: _propTypes.default.bool,
  showLeadingZeros: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.instanceOf(Date)])
};
(0, _reactLifecyclesCompat.polyfill)(DateInput);