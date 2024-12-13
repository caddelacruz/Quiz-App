import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import logo from '../../assets/logo.png'; 
import madLogo from '../../assets/MAD.png';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>Challenge your knowledge!</Text>
      <Text style={styles.subHeader}>
        Push your limits in a game that {'\n'}
        rewards sharp minds and a thirst for {'\n'}
        learning.
      </Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Category')}
      >
        <Text style={styles.buttonText}>Let's Play</Text>
      </TouchableOpacity>

      
      <View style={styles.poweredByContainer}>
        <Text style={styles.subHeader2}>Powered by:</Text>
        <Image source={madLogo} style={styles.madLogo} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#E2E8F0' 
  },
  logo: { 
    width: 200, 
    height: 200, 
   marginBottom: 100
  },
  header: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    marginVertical: 15 
  },
  subHeader: { 
    fontSize: 15, 
    textAlign: 'center', 
    marginBottom: 50 
  },
  subHeader2: { 
    fontSize: 11, 
    textAlign: 'center', 
    marginVertical: 10 
  },
  button: {
    backgroundColor: '#daa520',  
    paddingVertical: 15,         
    paddingHorizontal: 60,      
    borderRadius: 10,           
    marginTop: 20,              
    alignItems: 'center',       
    marginBottom: 50
  },
  buttonText: {
    fontSize: 20,               
    fontWeight: 'bold',         
    color: 'white',             
  },
  poweredByContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,        
  },
  madLogo: {
    width: 80,    
    height: 80,    
    marginLeft: 10, 
  }
});

export default WelcomeScreen;





