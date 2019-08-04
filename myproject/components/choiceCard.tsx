import React, { Fragment } from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from "../assets/styles";
import { Ichoices } from "../App";

interface IPropsChoiceCard {
  player: string,
  choice?: Ichoices
}
export const ChoiceCard: React.SFC<IPropsChoiceCard> = ({ player, choice }) => {
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      {choice
        ? <Fragment>
          <Image source={{ uri: choice.uri }} resizeMode="contain" style={styles.choiceImage} />
          <Text style={styles.choiceCardTitle}>
            {renderTitle(choice.name)}
          </Text>
        </Fragment>
        : null}
    </View>
  )
}
const renderTitle = (name) => name && name.charAt(0).toUpperCase() + name.slice(1)