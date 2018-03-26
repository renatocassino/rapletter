import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

const Key = ({ value }) => (
  <kbd className="light">{value}</kbd>
)

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open})
  handleClose = () => this.setState({open: false})

  render() {
    return (
      <div>
        <RaisedButton
          label="Tutorial"
          onClick={this.handleToggle}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({open})}
          width={500}
        >
          <div style={{padding: '1rem'}}>
            <h3>How to use</h3>

            <h4>Keyboard Events</h4>
            <p>You can use the keyboards bellow control the:</p>
            <h5>CuePoints</h5>
            <p><Key value={1} /> to <Key value={9} /> - To go to cuePoint (limit is 9).</p>
            <p><Key value={'Shift'} />+<Key value={1} /> to <Key value={'Shift'} />+<Key value={9} /> - Delete cuePoint.</p>
            <p><Key value={'L'} /> - To toggle the active loops.</p>
            <p><Key value={'N'} /> - To add a new CuePoint.</p>

            <h5>Player</h5>
            <p><Key value={'➡'} /> or <Key value={'d'} /> - To skip forward 5 seconds.</p>
            <p><Key value={'⬅'} /> or <Key value={'a'} /> - To skip backward 5 seconds.</p>
            <p><Key value={'Space'} /> or <Key value={'p'} /> - To play/pause.</p>
            <p><Key value={'Enter'} /> - To stop.</p>
          </div>
        </Drawer>
      </div>
    );
  }
}
