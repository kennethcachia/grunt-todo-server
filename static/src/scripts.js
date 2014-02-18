
var TEMPLATES = {
  file: '<div class="todo-file">' +
          '<span class="todo-filename">{name}</span>' +
          '<div class="todo-items"></div>' +
        '</div>',
  item: '<div class="todo-item">' +
           '<span class="todo-item-type">{prefix}</span>' +
           '<span class="todo-item-comment">{comment}' +
         '</div>'
};


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


var Todo = function () {
  this._data = window.TODO_DATA;

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
      file = this._renderView({ name: f }, TEMPLATES.file);
      parent = file._node.querySelector('.todo-items');

      for (var t = 0; t < data.length; t++) {
        this._renderView(data[t], TEMPLATES.item, parent);
      }
    }
  },


  _renderView: function (data, template, parent) {
    var view = new View(data, template);
    parent = parent || this._wrapper;

    view.render(parent);
    return view;
  },


  _bind: function () {

  }
};


document.addEventListener('DOMContentLoaded', function () {
  new Todo();
});
