import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const QuizScreen = ({ route, navigation }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(180); // Set a timer for 3 minutes (180 seconds)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0); // To track score
  const [timeSpent, setTimeSpent] = useState(0); // Track time spent on the quiz
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Get category from route params
  const category = route.params?.category || 'general';
  console.log('Received category:', category);

 
  // All questions and answers are from chatgpt
  const questions = {
    //GENERAL QUESTIONS and ANSWERS
    General: [
    {
      question: 'Which of the following is the longest river in the world?',
      options: ['A.  Nile ', 'B. Amazon', 'C.  Yangtze', 'D. Mississippi'],
      answer: 'B'
    },
    {
      question: 'What is the chemical symbol for the element with atomic number 79?',
      options: ['A. Silver', 'B. Gold', 'C. Carbon', 'D. Iron'],
      answer: 'B'
    },
    {
      question: 'Which scientist is known for developing the theory of general relativity?',
      options: ['A. Isaac Newton', 'B. Albert Einstein', 'C. Nikola Tesla', 'D. Galileo Galilei'],
      answer: 'B'
    },
    {
      question: 'In which year did the Titanic sink?',
      options: ['A. 1912', 'B. 1905', 'C. 1901', 'D. 1898'],
      answer: 'A'
    },
    {
      question: 'Who was the first female Prime Minister of the United Kingdom?',
      options: ['A. Margaret Thatcher', 'B.Theresa Thatcher', 'C. Elizabeth II', 'D. Julia Gillard'],
      answer: 'A'
    },
    {
      question: 'Which of the following countries was NOT part of the former Soviet Union?',
      options: ['A. Ukraine', 'B. Estonia', 'C. Poland', 'D. Georgia'],
      answer: 'C'
    },
    {
      question: 'In Greek mythology, who is the god of the sea?',
      options: ['A. Zeus', 'B. Ares', 'C. Poseidon', 'D. Hermes'],
      answer: 'C'
    },
    {
      question: 'Who wrote the novel "1984"?',
      options: ['A. Aldous Huxley', 'B. George Orwell', 'C. Ray Bradbury', 'D. J.R.R. Tolkien'],
      answer: 'B'
    },
    {
      question: 'Which element has the highest melting point?',
      options: ['A. Carbon', 'B. Tungsten', 'C. Iron', 'D. Osmuim'],
      answer: 'B'
    },
    {
      question: 'Which of the following artists is known for painting the ceiling of the Sistine Chapel?',
      options: ['A. Leonardo da Vinci', 'B. Raphael', 'C. Michelangelo', 'D. Vincent van Gogh'],
      answer: 'C'
    },
    ],


    // SCIENCE QUESTIONS and ANSWERS
    Science: [
      {
        question: 'Which element has the highest electronegativity on the periodic table?',
        options: ['A. Fluorine', 'B. Magnesium', 'C. Lithium', 'D. Bromine'],
        answer: 'A'
      },
      {
        question: 'What is the name of the process by which a liquid changes into a gas below its boiling point?',
        options: ['A. Sublimation ', 'B. Evaporation ', 'C. Condensation', 'D. Freezing'],
        answer: 'B'
      },
      {
        question: 'What is the name of the phenomenon where light bends as it passes through different mediums?',
        options: ['A. Reflection', 'B. Diffraction', 'C. Refraction', 'D. Dispersion'],
        answer: 'C'
      },
      {
        question: 'Which part of the brain is responsible for regulating heart rate and breathing?',
        options: ['A. Cerebellum', 'B. Medulla Oblongata', 'C. Hippocampus', 'D. Thalamus'],
        answer: 'B'
      },
      {
        question: 'What is the term for the process by which plants lose water through their leaves?',
        options: ['A.  Transpiration', 'B. Photosynthesis', 'C. Evaporation', 'D. Respiration'],
        answer: 'A'
      },
      {
        question: 'What is the most abundant gas in Earth’s atmosphere?',
        options: ['A. Oxygen', 'B. Carbon Dioxide', 'C. Nitrogen', 'D. Hydrogen'],
        answer: 'C'
      },
      {
        question: 'What is the chemical formula for ozone?',
        options: ['A. O', 'B. O₂', 'C. O₃', 'D. O₄'],
        answer: 'C'
      },
      {
        question: 'In the periodic table, what is the atomic number of carbon?',
        options: ['A. 6', 'B. 12', 'C. 8', 'D. 4'],
        answer: 'A'
      },
      {
        question: 'What is the process called in which plants use sunlight, water, and carbon dioxide to produce their own food, releasing oxygen as a byproduct?',
        options: ['A. Respiration', 'B. Photosynthesis', 'C. Fermentation', 'D. Transpiration'],
        answer: 'B'
      },
      {
        question: 'Which subatomic particle, found in the nucleus of an atom, has a positive charge and is roughly the same mass as a neutron?',
        options: ['A. Electron', 'B. Newton', 'C. Proton', 'D. Positron'],
        answer: 'C'
      },
    ],
    // MATH QUESTIONS and ANSWERS
    Math: [
      {
        question: 'If the area of a circle is 78.5 square units, what is the radius? (Use π = 3.14)',
        options: ['A. 4', 'B. 5', 'C. 10', 'D. 15'],
        answer: 'B'
      },
      {
        question: 'Solve for x: 3x + 4 = 19',
        options: ['A. 5', 'B. 4', 'C. 6', 'D. 3'],
        answer: 'A'
      },
      {
        question: 'What is the sum of the interior angles of a triangle?',
        options: ['A. 90 degrees', 'B. 180 degrees', 'C. 360 degrees', 'D. 540 degrees'],
        answer: 'B'
      },
      {
        question: 'If the length of a rectangle is 10 units and the width is 4 units, what is the perimeter?',
        options: ['A. 20 units', 'B. 24 units', 'C. 28 units', 'D. 40 units'],
        answer: 'C'
      },
      {
        question: 'If the probability of an event is 0.75, what is the probability of the event not occurring?',
        options: ['A. 0.75', 'B. 0.25', 'C. 1', 'D. 0.5'],
        answer: 'B'
      },
      {
        question: 'What is the slope of the line passing through the points (2, 3) and (4, 7)?',
        options: ['A. 2', 'B. 3', 'C. 4', 'D. 5'],
        answer: 'A'
      },
      {
        question: 'If a car travels 180 miles in 3 hours, what is the average speed of the car in miles per hour?',
        options: ['A. 30 mph', 'B. 45 mph', 'C. 60 mph', 'D. 90 mph'],
        answer: 'C'
      },
      {
        question: 'What is the value of x if 4x-7=13',
        options: ['A. 3', 'B. 5', 'C. 7', 'D. 9'],
        answer: 'B'
      },
      {
        question: 'A train is traveling at a constant speed of 80 km/h. How far will it travel in 4.5 hours?',
        options: ['A. 320 km', 'B. 340 km', 'C. 360 km', 'D. 400 km'],
        answer: 'C'
      },
      {
        question: 'What is the length of the hypotenuse of a right triangle with legs of 6 units and 8 units?',
        options: ['A. 10 units', 'B. 12 units', 'C. 14 units', 'D. 16 units'],
        answer: 'A'
      },
      ],

    // MUSIC QUESTIONS and ANSWERS
      Music: [
        {
          question: 'Which famous composer became deaf later in life but continued to compose music?',
          options: ['A. Ludwig van Beethoven', 'B. Wolfgang Amadeus Mozart', 'C. Johann Sebastian Bach', 'D. Franz Schulbert'],
          answer: 'A'
        },
        {
          question: 'Which instrument is known as the "king of instruments"?',
          options: ['A. Violin', 'B. Piano', 'C. Organ', 'D. Guitar'],
          answer: 'C'
        },
        {
          question: 'In which decade did The Beatles release their first album?',
          options: ['A. 1950s', 'B. 1960s', 'C. 1970s', 'D. 1940s'],
          answer: 'B'
        },
        {
          question: 'What is the Italian term for "slowly" in music?',
          options: ['A. Allegro', 'B. Andante', 'C. Largo', 'D. Presto'],
          answer: 'C'
        },
        {
          question: 'Which famous pop star is often referred to as the "King of Pop"?',
          options: ['A. Elvis Presley', 'B. Michael Jackson', 'C. Freddie Mercury', 'D. Prince'],
          answer: 'B'
        },
        {
          question: 'What is the name of the musical symbol that indicates the pitch of written notes?',
          options: ['A. Clef', 'B. Staff', 'C. Sharp', 'D. Flat'],
          answer: 'A'
        },
        {
          question: 'Which classical composer wrote "The Four Seasons"?',
          options: ['A. Antonio Vivaldi', 'B. Franz Liszt', 'C. Johannes Brahms', 'D. Claude Debussy'],
          answer: 'A'
        },
        {
          question: 'In music theory, how many sharps are in the key of E major?',
          options: ['A. 2', 'B. 3', 'C. 4', 'D. 5'],
          answer: 'C'
        },
        {
          question: 'What is the highest vocal range for a female singer?',
          options: ['A. Alto', 'B. Mezzo- Soprano', 'C. Soprano', 'D. Contralto'],
          answer: 'C'
        },
        {
          question: 'Which legendary band performed the song "Bohemian Rhapsody"?',
          options: ['A. Led Zeppelin', 'B. Queen', 'C. The Rolling Stones', 'D. Pink Floyd'],
          answer: 'B'
        },
        ],

    //HISTORY QUESTIONS and ANSWERS
    History: [
      {
        question: 'When did the Second Nagorno-Karabakh war end?',
        options: ['A. November 10, 2020', 'B. October 11, 2021', 'C. December 5, 2022', 'D. December 10, 2020'],
        answer: 'A'
      },
      {
        question: 'Greenland was a colony of which country until 1981?',
        options: ['A. Denmark', 'B. Norway', 'C. USA', 'D. UK'],
        answer: 'A'
      },
      {
        question: 'Who was the first President of the United States?',
        options: ['A. Thomas Jefferson', 'B. George Washington', 'C. Abraham Lincoln', 'D. John Adams'],
        answer: 'B'
      },
      {
        question: 'Who was the British Prime Minister during most of World War II?',
        options: ['A. Neville Chamberlain', 'B. Winston Churchill', 'C. Margaret Thatcher', 'D. Clement Attlee'],
        answer: 'B'
      },
      {
        question: 'The Great Wall of China was primarily built to protect against invasions from which group?',
        options: ['A. Mongols', 'B. Turks', 'C. Japanese', 'D. Persians'],
        answer: 'A'
      },
      {
        question: 'Who was the famous Greek philosopher who taught Alexander the Great?',
        options: ['A. Plato', 'B. Socrates', 'C. Aristotle', 'D. Pythagoras'],
        answer: 'C'
      },
      {
        question: 'Which treaty, signed in 1919, officially ended World War I and imposed significant reparations and territorial losses on Germany?',
        options: ['A. Treaty of Versailles', 'B. Treaty of Paris', 'C. Treaty of Ghent', 'D. Treaty of Tordesillas'],
        answer: 'A'
      },
      {
        question: 'What was the major economic crisis during the 1930s, starting with the 1929 stock market crash, that affected nations worldwide?',
        options: ['A. The Great Depression', 'B.  The Industrial Recession', 'C. The Panic of 1837 ', 'D. The Dust Bowl'],
        answer: 'A'
      },
      {
        question: 'What major event in 1969 involved Neil Armstrong and Buzz Aldrin becoming the first humans to walk on the Moon?',
        options: ['A. Apollo 11 Moon Landing', 'B. Voyager Space Mission', 'C.  Skylab Launch', 'D. Gemini 4 Spacewalk'],
        answer: 'A'
      },
      {
        question: 'Who was the French military leader who rose to prominence during the French Revolution and crowned himself Emperor of France in 1804?',
        options: ['A.  Napoleon Bonaparte', 'B. Louis XIV', 'C.  Maximilien Robespierre', 'D. Charles de Gaulle'],
        answer: 'A'
      },
    ]
  };


   // Use the category to get the questions for that category
   const currentCategoryQuestions = questions[category] || [];

   // Timer logic to reset each question
   useEffect(() => {
     // Update the timer every second
     const timerId = setInterval(() => {
       if (timer > 0) {
         setTimer(timer - 1);
       }
     }, 1000);
 
     return () => clearInterval(timerId); // Cleanup interval on unmount
   }, [timer]);
 
   const handleNextQuestion = () => {
    if (selectedAnswer === currentCategoryQuestions[questionIndex]?.answer) {
      setCorrectAnswers(prevCount => prevCount + 1);
      setScore(prevScore => prevScore + 1);
      console.log("Correct answer! Score:", score);
  } else {
    console.log("Incorrect answer.");
    }

    // Check if it's the last question
    if (questionIndex === currentCategoryQuestions.length - 1) {
        setIsNextButtonDisabled(true);
    } else {
        // Increment the question index by 1
        setQuestionIndex(prevIndex => prevIndex + 1);

        // Reset selected answer and timer for the next question
        setSelectedAnswer(null);
        setTimer(60);
    }
}; 
   const handleSubmit = () => {
    const timeSpent = 180 - timer;
    navigation.navigate('Score', { score, timeSpent, correctAnswers });
  };
 
   const currentQuestion = currentCategoryQuestions[questionIndex];
 
  const categoryImages = {
  Science: require('../../assets/science.png'),
  History: require('../../assets/history.png'),
  Music: require('../../assets/music.png'),
  General: require('../../assets/general.png'),
  Math: require('../../assets/math.png'),
  };

  // Format timer to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleOptionPress = (option) => {
    setSelectedAnswer(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={categoryImages[category]} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <View style={styles.grayBox}>
      <View style={styles.header}>
        <View style={styles.timerContainer}>
          <Image source={require('../../assets/timer-icon.png')} style={styles.timerIcon} />
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
        <Text style={styles.questionCounter}>Q {questionIndex + 1}/{currentCategoryQuestions.length}</Text>
      </View>
  
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        </View>
  
        <View style={styles.options}>
          {currentQuestion?.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, selectedAnswer === option && styles.selectedOption]}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Image source={require('../../assets/arrow-right.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },

  grayBox: {
    backgroundColor: '#d9d9d9',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 80, // Adjust logo size
    height: 80,
    marginRight: 10, // Space between logo and category name
  },

  categoryImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  grayBox: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    marginBottom: 20, // Space between gray box and next section
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 5, // Radius of the shadow's blur
    // Android shadow properties
    elevation: 5,
  },
  timeAndCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Add spacing below time and counter
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: '#f2f2f2', // Light gray background
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },

  optionButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 15,
    alignItems: 'flex-start', // Align text to the left
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
  },

  arrowIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    marginLeft: 40,
  },
  submitButton: {
    backgroundColor: '#f0c23a',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20, 
    alignSelf: 'center', 
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  nextButton: {
    backgroundColor: 'transparent', // Make the button transparent
    padding: 15,
    borderRadius: 10,
    alignSelf: 'flex-end', // Align the button to the right
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timerIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  selectedOption: {
    backgroundColor: '#666', // Dark gray color
  },

});

export default QuizScreen;
