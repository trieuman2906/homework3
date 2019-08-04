import React from 'react';
import { Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { styles } from "./assets/styles";
import { ChoiceCard } from './components/choiceCard'


export interface Ichoices {
  name: string,
  uri: string
}


interface IStateApp {
  gamePrompt: string,
  choices: Ichoices[],
  participant: string,
  userChoice: Ichoices,
  computerchoice: Ichoices,
  turn: number,
  winGame: number,
  loseGame: number,
  tieGame: number
}
const fakedata: Ichoices[] = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
  },
  {
    name: 'paper',
    uri:
      'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png',
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png',
  },
]

export default class App extends React.Component<{}, IStateApp> {
  constructor(props) {
    super(props);
    this.state = {
      gamePrompt: 'Choose your weapon!',
      participant: null,
      userChoice: null,
      computerchoice: null,
      choices: fakedata,
      turn: 0,
      winGame: 0,
      loseGame: 0,
      tieGame: 0
    };
  }

  public render() {
    return renderContent(this)
  }
}

const renderContent = (component: App) => {
  let { gamePrompt, userChoice, computerchoice, turn } = component.state;
  return <View style={styles.container}>
    <Text style={{ fontSize: 35, color: getResultColor(component) }}>
      {gamePrompt}
    </Text>
    <View style={styles.choicesContainer}>
      <ChoiceCard
        player={participant.player}
        choice={userChoice} />
      <Text style={{ color: '#250902' }}>vs</Text>
      <ChoiceCard
        player={participant.computer}
        choice={computerchoice} />
    </View>
    {renderButtonControl(component)}
    <TouchableOpacity style={styles.buttonStyle}>
      <Text style={styles.buttonText} onPress={() => ShowInfo(component)}>
        Show details
      </Text>
    </TouchableOpacity>
  </View>
}

const renderButtonControl = (Component: App) => {
  let { choices } = Component.state
  let render = choices.map((choice, index) => {
    return <TouchableOpacity
      onPress={() => onPress(Component, choice.name)}
      style={styles.buttonStyle}
      key={`choice_${index}`}
    >
      <Text style={styles.buttonText}>{choice.name}</Text>
    </TouchableOpacity>
  })
  return render
}

const onPress = (component: App, playerChoice: string) => {
  let { choices, turn, winGame, loseGame, tieGame } = component.state
  const [Result, compChoice] = getRoundOutcome(component, playerChoice);
  if (Result === result.victory) {
    winGame = winGame + 1
  } else if (Result === result.defeat) {
    loseGame = loseGame + 1
  } else {
    tieGame = tieGame + 1
  }
  const newUserChoice = choices.find(choice => choice.name === playerChoice);
  const newComputerChoice = choices.find(choice => choice.name === compChoice);
  component.setState({
    userChoice: newUserChoice,
    gamePrompt: Result,
    computerchoice: newComputerChoice,
    turn: turn + 1,
    winGame,
    loseGame,
    tieGame
  })
};

const getRoundOutcome = (component: App, userChoice: string) => {
  const computerChoice = randomComputerChoice(component).name
  let Result;
  if (userChoice === option.rock) {
    Result = computerChoice === option.scissors ? result.victory : result.defeat;
  }
  if (userChoice === option.paper) {
    Result = computerChoice === option.rock ? result.victory : result.defeat;
  }
  if (userChoice === option.scissors) {
    Result = computerChoice === option.paper ? result.victory : result.defeat;
  }

  if (userChoice === computerChoice) Result = result.tie;

  return [Result, computerChoice];
};

const randomComputerChoice = (component: App) => {
  let { choices } = component.state
  return choices[Math.floor(Math.random() * choices.length)];
}

const getResultColor = (component: App) => {
  let { gamePrompt } = component.state
  if (gamePrompt === result.victory) return 'green';
  if (gamePrompt === result.defeat) return 'red';
  return null;
};

const ShowInfo = (component: App) => {
  let { turn, winGame, loseGame, tieGame } = component.state
  let winPercentages = Math.round(winGame / turn * 100)
  let losePercentages = Math.round(loseGame / turn * 100)
  let tiePercentages = Math.round(tieGame / turn * 100)
  Alert.alert("Info game",
    `Bạn đã chơi tổng cộng :${turn}
    Win:: ${winGame}
    lose: ${loseGame}
    tie: ${tieGame}
    win percentages: ${winPercentages} %
    lose percentages: ${losePercentages} %
    tie percentages: ${tiePercentages} %
    `,
    [
      { text: 'Reset', onPress: () => resetGame(component) },
      { text: 'OK' },
    ]
  )
}
const resetGame = (component: App) => {
  component.setState({
    tieGame: 0,
    winGame: 0,
    loseGame: 0,
    turn: 0
  })
}

enum participant {
  player = "Player",
  computer = "Computer"
}
enum result {
  victory = "Victory!",
  defeat = "Defeat!",
  tie = "Tie game!"
}
enum option {
  rock = "rock",
  paper = "paper",
  scissors = "scissors"
}