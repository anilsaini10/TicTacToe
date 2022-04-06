import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Pressable,
  useState,
} from "react-native";
import { render } from "react-dom";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

import { Audio } from "expo-av";

import { LinearGradient } from "expo-linear-gradient";
import { Sound } from "expo-av/build/Audio";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      songName: "a",

      player: "X",
    };
  }

  // componentDidMount() {
  //   this.initializeGame();
  // }
  async componentDidMount() {
    this.initializeGame();

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playsThroughEarpieceAndroid: true,
    });

    this.sound = new Audio.Sound();
    this.sound1 = new Audio.Sound();
    const status = {
      shouldPlay: false,
    };
    this.sound.loadAsync(require("./assets/a.mp3"), status, false);
    this.sound1.loadAsync(require("./assets/e.mp3"), status, false);
  }

  playSound() {
    this.sound.playAsync();
    setTimeout(() => {
      this.sound.stopAsync();
    }, 600);
  }
  playSound1() {
    this.sound1.playAsync();

    setTimeout(() => {
      this.sound1.stopAsync();
    }, 5000);
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };

  gameWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    //row
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //col
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    return 0;
  };

  newGame = () => {
    this.initializeGame();
    this.playSound();
    // this.state.songName = "b";
  };
  onTitlePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value != 0) {
      return;
    }

    // present player
    var currentPlayer = this.state.currentPlayer;
    
    //set present title
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //next player
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    if(currentPlayer==1){
     this.setState({player:"O"});
    }else{
      this.setState({player:"X"});
    }
    this.setState({ currentPlayer: nextPlayer });

    //find winners
    var winner = this.gameWinner();
    if (winner == 1) {
      Alert.alert("Finished", "Winner: X", [
        { text: "New Game", onPress: () => this.sound1.stopAsync() },
      ]);

      this.playSound1();
      this.initializeGame();
    }
    if (winner == -1) {
      Alert.alert("Finished", "Winner: O", [
        { text: "New Game", onPress: () => this.sound1.stopAsync() },
      ]);

      this.playSound1();
      this.initializeGame();
    }

    this.playSound();
    return 0;
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.titleX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.titleO} />;
      default:
        return <View />;
    }
  };


  render() {
    return (
      <LinearGradient
        // colors={['tomato', 'yellow', 'green']}
        // colors={['#6c5ce7', '#ffeaa7']}
        // colors={['orange', 'white', 'green']}
        colors={["#e6bf83", "#be975b"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5]}
        style={styles.button}
        style={styles.container}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => this.onTitlePress(0, 0)}
            style={[styles.title, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTitlePress(0, 1)}
            style={[styles.title, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTitlePress(0, 2)}
            style={[styles.title, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTitlePress(1, 0)}
            style={[styles.title, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTitlePress(1, 1)}
            style={[styles.title, {}]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTitlePress(1, 2)}
            style={[styles.title, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTitlePress(2, 0)}
            style={[styles.title, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTitlePress(2, 1)}
            style={[styles.title, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTitlePress(2, 2)}
            style={[
              styles.title,
              { borderBottomWidth: 0, borderRightWidth: 0 },
            ]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.turn_heading}>
          <Text style={styles.turn_text}>Turn: Player {this.state.player}</Text>
        </View>
        <Pressable style={styles.button} onPress={this.newGame}>
          <Text style={styles.text}>New Game</Text>
        </Pressable>

        {/* <View style={styles.button}>
          <Button title="Play Sound" onPress={this.playSound.bind(this)} />
        </View> */}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "yellow",
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#E6BF83",
  },
  title: {
    borderWidth: 2,
    width: "30%",
    height: 100,
  },
  titleX: {
    color: "red",
    fontSize: 90,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleO: {
    color: "blue",
    fontSize: 80,
    flex: 1,
    // alignItems:"center",
    // justifyContent:"center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "black",
    marginVertical: 40,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  turn_heading: {
    // backgroundColor: "green",
    alignContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  turn_text: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 25,
  },
});
