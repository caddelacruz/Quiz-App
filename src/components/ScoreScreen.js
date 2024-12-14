import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ScoreScreen = ({ route, navigation }) => {
  const { Score, timeSpent, correctAnswers } = route.params; 

  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.scoreText}>Score</Text>

      <View style={styles.infoBox}>
        <Image source={require('../../assets/trophy.png')} style={styles.logo} />
        <Text style={styles.congratulations}>Congratulations!</Text>
        <Text style={styles.scoreDetails}>{Score}</Text>
        <View style={styles.row}>
          <View style={styles.timerBox}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.timeText}>{formatTime(timeSpent)}</Text>
          </View>
          <Text style={styles.correctAnswers}>{correctAnswers}/10 Correct</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('Category')}
      >
        <Text style={styles.customButtonText}>Take New Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30, 
    marginBottom: 50,
  },
  infoBox: {
    backgroundColor: '#E2E8F0', 
    padding: 70,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 50,
    
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  congratulations: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreDetails: {
    fontSize: 60,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  timerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correctAnswers: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  customButton: {
    backgroundColor: '#daa520', 
    paddingVertical: 15, 
    width: 200, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 5, 
    marginTop: 20, 
  },
  customButtonText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ScoreScreen;





