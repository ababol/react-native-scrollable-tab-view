'use strict';

var React = require('react-native');
var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = React;

var { Icon, } = require('react-native-icons');
var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },

  tabs: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },

  icon: {
    width: 30,
    height: 30,
  }
});

var DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    var tabActiveColor = 'navy';
    if (this.props.tabUnderlineStyle) {
      tabActiveColor = this.props.tabUnderlineStyle.backgroundColor || 'navy';
    }
    var tabInactiveColor = this.props.tabInactiveColor || 'grey';
    var iconSize = 30;
    if (this.props.tabStyle) {
      iconSize = this.props.tabStyle.height || 30;
    }

    return (
      <TouchableOpacity style={[styles.tab, this.props.tabStyle]} key={name} onPress={() => this.props.goToPage(page)}>
        <View>
          <Icon
            name={name}
            size={iconSize}
            color={isTabActive ? tabActiveColor : tabInactiveColor}
            style={[styles.icon, this.props.iconStyle]} />
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: deviceWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, deviceWidth / numberOfTabs]
    });

    return (
      <View style={[styles.tabs, this.props.navBarStyle]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, {left}, this.props.tabUnderlineStyle]} />
      </View>
    );
  },
});

module.exports = DefaultTabBar;
