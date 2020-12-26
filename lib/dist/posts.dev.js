"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortedPostsData = getSortedPostsData;
exports.getAllPostIds = getAllPostIds;
exports.getPostData = getPostData;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _grayMatter = _interopRequireDefault(require("gray-matter"));

var _remark = _interopRequireDefault(require("remark"));

var _remarkHtml = _interopRequireDefault(require("remark-html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var postsDirectory = _path["default"].join(process.cwd(), "posts");

function getSortedPostsData() {
  var fileNames = _fs["default"].readdirSync(postsDirectory);

  var allPostData = fileNames.map(function (fileName) {
    var id = fileName.replace(/\.md$/, "");

    var fullPath = _path["default"].join(postsDirectory, fileName);

    var fileContents = _fs["default"].readFileSync(fullPath, "utf-8");

    var matterResult = (0, _grayMatter["default"])(fileContents);
    return _objectSpread({
      id: id
    }, matterResult.data);
  });
  return allPostData.sort(function (a, b) {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function getAllPostIds() {
  var fileNames = _fs["default"].readdirSync(postsDirectory); // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]


  return fileNames.map(function (fileName) {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    };
  });
}

function getPostData(id) {
  var fullPath, fileContents, matterResult, processedContent, contentHtml;
  return regeneratorRuntime.async(function getPostData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fullPath = _path["default"].join(postsDirectory, "".concat(id, ".md"));
          fileContents = _fs["default"].readFileSync(fullPath, "utf8");
          matterResult = (0, _grayMatter["default"])(fileContents);
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _remark["default"])().use(_remarkHtml["default"]).process(matterResult.content));

        case 5:
          processedContent = _context.sent;
          contentHtml = processedContent.toString();
          return _context.abrupt("return", _objectSpread({
            id: id,
            contentHtml: contentHtml
          }, matterResult.data));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}