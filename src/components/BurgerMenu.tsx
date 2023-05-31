import { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import ResultTable from './ResultTable';
import { MainContext } from '../context/Context';

export default class BurgerMenu extends Component {
  static contextType = MainContext;
  
  state = { activeItem: 'home' }

  handleItemClick = (_e: any, { name }: any) => this.setState({ activeItem: name })
  
  componentDidUpdate(prevProps, prevState) {
    const { isClicked } = this.context;
    if (isClicked && prevState.activeItem !== 'unhide') {
      this.setState({ activeItem: 'unhide' });
    }
  }
  render() {
    const { activeItem } = this.state

    return (
      <div className='menu-container'>
        <Menu icon='labeled' vertical>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Icon name='home' />
            Home
          </Menu.Item>

          <Menu.Item
            name='unhide'
            active={activeItem === 'unhide'}
            onClick={this.handleItemClick}
          >
            <Icon name='unhide' />
            Unhide
          </Menu.Item>

          <Menu.Item
            name='hide'
            active={activeItem === 'hide'}
            onClick={this.handleItemClick}
          >
            <Icon name='hide' />
            Hide
          </Menu.Item>
        </Menu>
          {activeItem === 'unhide' && (
          <div className='result-table'>
            <ResultTable />
          </div>
        )}
      </div>
    )
  }
}