
import SideMenu from './components/Menu/index';
import formLogin from './components/signIn/index';

import {DrawerNavigator} from 'react-navigation';

import { createDrawerNavigator } from '@react-navigation/drawer';

export default createDrawerNavigator({
    formLogin: {
    screen: formLogin
  }
  
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});