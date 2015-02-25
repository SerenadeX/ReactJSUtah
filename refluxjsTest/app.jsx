
var action = Reflux.createActions(["bump","fumble","spike"]);

Reflux.ActionMethods.updateAnalytics = function(thing) {
    console.log("Updating analytics for " + thing.name);
};

var store = Reflux.createStore({
  listenables:[action],

  onBump: function() {
    this.trigger({message: "Bumping!"})
  },
  onFumble: function() {
    this.trigger({message: "Fumbling!"})
  },
  onSpike: function() {
    this.trigger({message: "Spiking!"})
  },

  onAction: function() {
    console.log('on Action invoked');
  }

});

var trinketStore = Reflux.createStore({
  init: function() {
    this.listenTo(store, this.onStore);
  },
  onStore: function() {
    console.log("old store updated");
  }
})


var Comp = React.createClass({
  getInitialState: function() {
    return {message: "Hello World"}
  },
  render: function() {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
});

var Boom = React.createClass({
  mixins: [Reflux.connect(store)],
  render: function() {
    return (<div>
      <h2>What should I be doing?</h2>
      <p>{this.state.message}</p>
      <button onClick={action.bump}>Bump</button>
      <button onClick={action.fumble}>Fumble</button>
      <button onClick={action.spike}>Spike</button>
    </div>)
  }
})

action.fumble.preEmit = function() {
  //This value returned is passed to the shouldEmit function
  return true;
}

action.bump.shouldEmit = function() {
  //Must return true to allow the emission to continue.
  console.log("You must never bump");
  return false
}



React.render(<Boom></Boom>, document.body);
