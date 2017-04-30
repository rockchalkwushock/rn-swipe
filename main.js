import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Deck } from './src';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class App extends Component {
  _renderCard(card) {
    return (
      <Card
        image={{ uri: card.uri }}
        key={card.id}
        title={card.text}
      >
        <Text style={{ marginBottom: 10 }}>Poop!</Text>
        <Button
          backgroundColor='#03A9F4'
          icon={{name: 'code'}}
          title='View Now!'
        />
      </Card>
    );
  }
  _renderNoMoreCards() {
    return (
      <Card title={'All done!'}>
        <Text style={{ marginBottom: 10 }}>
          Ain't I a stinker!
        </Text>
        <Button
          backgroundColor='#03A9F4'
          title='Get More!'
        />
      </Card>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          noCards={this._renderNoMoreCards}
          renderCard={this._renderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Expo.registerRootComponent(App);
