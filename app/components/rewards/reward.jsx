var React = require('react');

var Reward = React.createClass( {
    render: function(){
        return(
            <div className="reward col-xs-12 col-sm-4">
                <img  src="/assets/reward.jpg" alt="name" title="name" />
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

module.exports = Reward;
