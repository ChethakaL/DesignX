import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function Sidebar({ height }) {
  return (
    <div style={{ display: 'flex', height: {height}, minHeight: '400px' }}>
      <ProSidebar>
        <h2 style={{padding:'20px'}}>Filter</h2>
        <Menu iconShape="square">
          <SubMenu title="Categories" icon={<span>🧥</span>}>
            <MenuItem>Tops</MenuItem>
            <MenuItem>Bottoms</MenuItem>
            <MenuItem>Dresses</MenuItem>
            <MenuItem>Outerwear</MenuItem>
          </SubMenu>
          <SubMenu title="Colors" icon={<span>🌈</span>}>
            <MenuItem>Red</MenuItem>
            <MenuItem>Blue</MenuItem>
            <MenuItem>Green</MenuItem>
            <MenuItem>Black</MenuItem>
          </SubMenu>
          <SubMenu title="Sizes" icon={<span>📏</span>}>
            <MenuItem>Small</MenuItem>
            <MenuItem>Medium</MenuItem>
            <MenuItem>Large</MenuItem>
            <MenuItem>X-Large</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
