import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
  { name: 'General', image: require('../../assets/general.png') },
  { name: 'Science', image: require('../../assets/science.png') },
  { name: 'Music', image: require('../../assets/music.png') },
  { name: 'Math', image: require('../../assets/math.png') },
  { name: 'History', image: require('../../assets/history.png') },
];

const CategoryScreen = ({ navigation }) => {
  // Add a state to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category selection
  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName); // Update the selected category
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (selectedCategory) {
      navigation.navigate('Quiz', { category: selectedCategory });
    } else {
      alert('Please select a category first!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category</Text>

      <ScrollView style={styles.scrollContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryContainer,
              // Change the background color of the selected category
              selectedCategory === category.name && styles.selectedCategory
            ]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleSubmit} // Use handleSubmit on press
        >
          <Text style={styles.customButtonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 25,
    marginBottom: 60,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0', // Default background color
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginHorizontal: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 20,
    shadowRadius: 3,
    elevation: 7,
  },
  selectedCategory: {
    backgroundColor: '#A0AEC0', // Darker color when selected
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 22,
    color: 'black',
    flex: 1,
    textAlign: 'center',
    marginRight: 65,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 25,
    marginBottom: 50,
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: '#daa520',
    paddingVertical: 15,
    width: 200,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  customButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CategoryScreen;
























  
