/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  Animated,
  Dimensions,
  PanResponder
} from 'react-native';




SCREEN_HEIGHT = Dimensions.get("window").height
SCREEN_WIDTH = Dimensions.get("window").width

export default class App extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT })
    this.state = {
      currentIndex: 0,

      article: [
        { id: 1, uri: "https://image.shutterstock.com/image-vector/news-background-world-map-backdrop-260nw-691718833.jpg" },
        { id: 2, uri: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/news/2020/01_2020/coronavirus_1/1800x1200_coronavirus_1.jpg" },
        { id: 3, uri: "https://static.toiimg.com/thumb/imgsize-2349009,msid-74504980,width-400,resizemode-4/74504980.jpg" },
        { id: 4, uri: "https://img.etimg.com/thumb/width-640,height-480,imgsize-430074,resizemode-1,msid-59179639/london-fire-death-toll-rises-to-30-fears-it-could-climb-over-100.jpg" },
        { id: 5, uri: "https://th.thgim.com/news/national/q5ucaw/article29579934.ece/alternates/FREE_435/Modi-01" },
      ]
    }
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create(
      {
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dy > 0 && this.state.currentIndex > 0) {
            this.swipedCardPosition.setValue({
              x: 0, y: -SCREEN_HEIGHT + gestureState.dy
            })
          }
          else {
            if (!
              (this.state.currentIndex == this.state.article.length - 1)) {
              console.log(this.state.currentIndex)
              console.log(this.state.article.length - 1)
              this.position.setValue({
                y: gestureState.dy,
                x: 1
              })
            }

          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy > 150 && gestureState.vy > 0.7) {
            Animated.timing(this.swipedCardPosition, {
              toValue: ({
                y: 0,
                x: 0
              }),
              duration: 400
            }).start(() => {
              this.setState({
                currentIndex: this.state.currentIndex - 1,
              })
              this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })
            })
          }
          else if (-gestureState.dy > 150 && -gestureState.vy > 0.7) {
            Animated.timing(this.position, {
              toValue: ({
                y: -SCREEN_HEIGHT,
                x: 0
              }),
              duration: 400
            }).start(() => {
              this.setState({
                currentIndex: this.state.currentIndex + 1,
              })
              this.position.setValue({ x: 0, y: 0 })
            })
          } else {
            Animated.parallel([
              Animated.spring(this.position, {
                toValue: ({
                  x: 0,
                  y: 0
                })
              }),
              Animated.spring(this.swipedCardPosition, {
                toValue: ({
                  x: 0,
                  y: -SCREEN_HEIGHT
                })
              })
            ]).start()
          }
        }
      }
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,

      }}>
        {this.renderArticles()}
      </View>
    )
  }

  renderArticles = () => {
    return this.state.article.map((item, index) => {
      if (index == this.state.currentIndex - 1) {
        return (
          <Animated.View style={
            this.swipedCardPosition.getLayout()
          }{...this.PanResponder.panHandlers}>
            <ArticleView item={item} />
          </Animated.View>
        )
      }
      else if (index < this.state.currentIndex)
        return null
      else if (index == this.state.currentIndex) {
        return (
          <Animated.View style={
            this.position.getLayout()
          }{...this.PanResponder.panHandlers}>
            <ArticleView item={item} />
          </Animated.View>
        )
      }
      else {
        return (
          <ArticleView item={item} />
        )
      }
    }).reverse()
  }
}

const ArticleView = (props) => {
  console.log(props.item ? props.item.uri : "kuch ni")
  return (
    <View style={{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      position: 'absolute',
      backgroundColor: 'white'
    }}>
      <View style={{
        flex: 1
      }}>
        <Image
          style={
            {
              width: "100%",
              height: 300,

            }
          }
          source={{ uri: props.item ? props.item.uri : "" }}
        />
      </View>

      <View style={{
        padding: 7,
        flex: 1,
        backgroundColor: 'white'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 15
        }}>I don’t have my birth certificate, should I die? Telangana CM on CAA, NRC</Text>
        <Text style={{
          justifyContent: 'center',
          // textAlign: 'center',
        }}>
          Responding to concerns over CAA, NRC and NPR, Telangana Chief Minister K Chandrasekhar Rao has said that he doesn't have a birth certificate since there was no documentation back then. "When I myself don’t have a birth certificate, how can I produce the certificate of my father? Should I die then?" he asked
          Responding to concerns over CAA, NRC and NPR, Telangana Chief Minister K Chandrasekhar Rao has said that he doesn't have a birth certificate since there was no documentation back then. "When I myself don’t have a birth certificate, how can I produce the certificate of my father? Should I die then?" he asked
</Text>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({

});


