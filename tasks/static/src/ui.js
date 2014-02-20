
/**
 * View
 * @param {Object} data
 * @param {String} template
 */
var View = function (data, template) {
  this._data = data;
  this._template = template;
  this._node = null;
};


View.prototype = {

  render: function (parent) {
    var container = this._createContainer();
    var compiled = this._compileTemplate();

    container.innerHTML = compiled;
    this._node = container.children[0];

    parent.appendChild(this._node);
  },


  on: function (selector, eventname, callback, context) {
    this._node.addEventListener(eventname, function (e) {
      this._delegator(e, selector, callback, context);
    }.bind(this), true);
  },


  _createContainer: function () {
    return document.createElement('div');
  },


  _compileTemplate: function () {

    var compiled = Object.keys(this._data).reduce(function (output, key) {
      return output.replace('{' + key + '}', this._data[key]);
    }.bind(this), this._template, this);

    return compiled;
  },


  _delegator: function (e, selector, callback, context) {
    if (e.target.classList.contains(selector)) {
      callback.apply(context);
    }
  }

};


/**
 * Todo
 * @param {Object} templates
 * @param {Object} data
 */
var Todo = function (templates, data) {
  this._templates = templates;
  this._data = data;

  if (!this._data) {
    throw 'Todo data not available';
  }

  this._init();
};


Todo.prototype = {

  _init: function () {
    this._wrapper = document.body.querySelector('.todo');
    this._render();
    this._bind();
  },


  _render: function () {
    var data;
    var file;
    var parent;

    for (var f in this._data) {
      data = this._data[f];

      file = this._renderView({ name: f }, this._templates.file);
      parent = file._node.querySelector('.todo-items');

      for (var t = 0; t < data.length; t++) {
        this._renderView(data[t], this._templates.item, parent);
      }
    }

    if (this._wrapper.children.length === 0) {
      var msg = this._randomCompleteMessage();
      this._renderView({ msg: msg }, this._templates.done);
    }
  },


  _bind: function () { },


  _randomCompleteMessage: function () {
    var msgs = [
      'Ready',
      'All tasks are complete.',
      'No outstanding tasks.'
    ];

    var max = msgs.length;
    var index = Math.floor(Math.random() * max);

    return msgs[index];
  },


  _renderView: function (data, template, parent) {
    var view = new View(data, template);
    parent = parent || this._wrapper;

    view.render(parent);
    return view;
  }
};


/**
 * Launch UI
 */
document.addEventListener('DOMContentLoaded', function () {

  var templates = {
    file: '<div class="todo-file">' +
            '<span class="todo-filename">{name}</span>' +
            '<div class="todo-items"></div>' +
          '</div>',
    item: '<div class="todo-item">' +
             '<span class="todo-item-type">{prefix}</span>' +
             '<span class="todo-item-comment">{comment}' +
           '</div>',
    done: '<div class="todo-done">{msg}</div>'
  };

  new Todo(templates, window.TODO_DATA);

});
