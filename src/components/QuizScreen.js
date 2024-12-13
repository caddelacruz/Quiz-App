import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const QuizScreen = ({ route, navigation }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(180); // Set a timer for 3 minutes (180 seconds)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0); // To track score

  // Get category from route params
  const category = route.params?.category;

  // All questions and answers are from chatgpt
  // All questions and answers are from chatgpt
  const questions = {
    //GENERAL QUESTIONS and ANSWERS
    general: [
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
    science: [
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
    math: [
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
      music: [
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
    history: [
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
    if (timer === 0) return; 

    const timerInterval = setInterval(() => {
      setTimer(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [questionIndex, timer]); // Reset timer when the question changes

  const handleNextQuestion = () => {
    if (selectedAnswer === currentCategoryQuestions[questionIndex]?.answer) {
      setScore(prevScore => prevScore + 1); 
    }// Reset selected answer
    setQuestionIndex(prevIndex => Math.min(prevIndex + 1, currentCategoryQuestions.length - 1));
    setTimer(60); 
  };

  const handleSubmit = () => {
    navigation.navigate('Score', { score: score });
  };

  const currentQuestion = currentCategoryQuestions[questionIndex];

  
  const categoryImages = {
    science: require('../../assets/science.png'),
    history: require('../../assets/history.png'),
    music: require('../../assets/music.png'),
    general: require('../../assets/general.png'),
    math: require('../../assets/math.png'),
  };

  // Format timer to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={categoryImages[category]} style={styles.logo} />
        <Text style={styles.categoryText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      </View>
      
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Text style={styles.questionCounter}>Q {questionIndex + 1}/{currentCategoryQuestions.length}</Text>
      </View>

      
      {currentQuestion ? (
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.options}>
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => setSelectedAnswer(option)} 
                color="#000" 
              />
            ))}
          </View>
        </View>
      ) : (
        <Text>No question available</Text> 
      )}

      {timer === 0 && <Text style={styles.timerUp}>Time's up!</Text>}

      <Button
        title="Next"
        onPress={handleNextQuestion}
        disabled={questionIndex >= currentCategoryQuestions.length - 1}
      />

      {/* Submit Button Styled */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={questionIndex < currentCategoryQuestions.length - 1}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 20,
  },
  logo: { 
    width: 50, 
    height: 50, 
    marginRight: 10 
  },
  categoryText: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  timerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20 
  },
  timer: { 
    fontSize: 18 
  },
  questionCounter: { 
    fontSize: 18 
  },
  questionBox: { 
    backgroundColor: '#daa520', 
    padding: 20, 
    borderRadius: 10, 
    width: '100%' 
  },
  questionText: { 
    fontSize: 18, 
    marginBottom: 20 
  },
  options: { 
    marginVertical: 20 
  },
  timerUp: { 
    color: 'red', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  submitButton: {
    backgroundColor: '#daa520', 
    paddingVertical: 15, 
    width: '80%', 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 5, 
    marginTop: 20, 
    position: 'absolute', 
    bottom: 40, 
  },
  submitButtonText: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});

export default QuizScreen;


