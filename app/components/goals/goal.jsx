var React = require('react');

var Goal = React.createClass( {
    render: function(){
        return(
            <div className="goal col-xs-12 col-sm-4">
                <img  src="/assets/goal.jpg" alt="name" title="name" />
                <h3>Title</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris nibh arcu, venenatis vel vehicula sed, fermentum eget diam.
                    Phasellus ultricies metus eu ante luctus sagittis.
                    Nulla in augue a dui sagittis mattis. Sed volutpat magna eu varius tempor.
                    Vivamus ac vestibulum tellus. Maecenas ac ultricies urna.
                </p>
                <div className="costContainer">Points</div>
                <div className="text-center">
                    <a className="btn btn-default" href="#">Apply</a>
                </div>
            </div>
        );
    }
});

module.exports = Goal;
