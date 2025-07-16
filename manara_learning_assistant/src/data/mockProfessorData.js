export const professors = [
  {
    id: 1,
    name: "Dr. Evelyn Reed",
    department: "Computer Science",
    courses: ["Intro to Algorithms", "Data Structures"],
    overallRating: 4.5,
    reviews: [
      {
        student: "Alex",
        professionalism: "PhD",
        grade: "A",
        wouldTakeAgain: "Yes",
        difficulty: "Hard",
        teachingStyle: "Excellent",
      },
      {
        student: "Beth",
        professionalism: "PhD",
        grade: "B",
        wouldTakeAgain: "Yes",
        difficulty: "Medium",
        teachingStyle: "Good",
      },
    ],
  },
  {
    id: 2,
    name: "Prof. Ben Carter",
    department: "Mathematics",
    courses: ["Calculus II", "Linear Algebra"],
    overallRating: 3.8,
    reviews: [
      {
        student: "Chris",
        professionalism: "Professor",
        grade: "B+",
        wouldTakeAgain: "Yes",
        difficulty: "Hard",
        teachingStyle: "Good",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    department: "Physics",
    courses: ["Quantum Mechanics", "Electromagnetism"],
    overallRating: 4.8,
    reviews: [
      {
        student: "Dana",
        professionalism: "PhD",
        grade: "A-",
        wouldTakeAgain: "Yes",
        difficulty: "Hard",
        teachingStyle: "Excellent",
      },
    ],
  },
  {
    id: 4,
    name: "Prof. Michael Ramirez",
    department: "History",
    courses: ["World History", "Ancient Civilizations"],
    overallRating: 4.1,
    reviews: [
      {
        student: "Frank",
        professionalism: "Professor",
        grade: "B",
        wouldTakeAgain: "Yes",
        difficulty: "Easy",
        teachingStyle: "Good",
      },
      {
        student: "Grace",
        professionalism: "Professor",
        grade: "A",
        wouldTakeAgain: "Yes",
        difficulty: "Easy",
        teachingStyle: "Excellent",
      },
    ],
  },
  {
    id: 5,
    name: "Dr. Olivia Grant",
    department: "Chemistry",
    courses: ["Organic Chemistry", "Biochemistry"],
    overallRating: 3.2,
    reviews: [
      {
        student: "Heidi",
        professionalism: "PhD",
        grade: "C",
        wouldTakeAgain: "No",
        difficulty: "Hard",
        teachingStyle: "Poor",
      },
    ],
  },
  {
    id: 6,
    name: "Prof. David Kim",
    department: "Economics",
    courses: ["Microeconomics", "Macroeconomics"],
    overallRating: 4.3,
    reviews: [
      {
        student: "Ivan",
        professionalism: "Professor",
        grade: "A",
        wouldTakeAgain: "Yes",
        difficulty: "Medium",
        teachingStyle: "Excellent",
      },
    ],
  },
  {
    id: 7,
    name: "Dr. Laura Bailey",
    department: "Psychology",
    courses: ["Cognitive Psychology", "Social Psychology"],
    overallRating: 4.9,
    reviews: [
      {
        student: "Judy",
        professionalism: "PhD",
        grade: "A+",
        wouldTakeAgain: "Yes",
        difficulty: "Medium",
        teachingStyle: "Excellent",
      },
    ],
  },
  {
    id: 8,
    name: "Prof. James Rodriguez",
    department: "Art History",
    courses: ["Renaissance Art", "Modern Art"],
    overallRating: 4.0,
    reviews: [
      {
        student: "Kevin",
        professionalism: "Professor",
        grade: "B-",
        wouldTakeAgain: "Yes",
        difficulty: "Easy",
        teachingStyle: "Good",
      },
    ],
  },
  {
    id: 9,
    name: "Dr. Emily Patel",
    department: "Biology",
    courses: ["Genetics", "Cell Biology"],
    overallRating: 4.6,
    reviews: [
      {
        student: "Liam",
        professionalism: "PhD",
        grade: "A",
        wouldTakeAgain: "Yes",
        difficulty: "Hard",
        teachingStyle: "Excellent",
      },
    ],
  },
  {
    id: 10,
    name: "Prof. Robert Hughes",
    department: "Philosophy",
    courses: ["Introduction to Logic", "Ethics"],
    overallRating: 3.5,
    reviews: [
      {
        student: "Mia",
        professionalism: "Professor",
        grade: "C+",
        wouldTakeAgain: "No",
        difficulty: "Medium",
        teachingStyle: "Poor",
      },
    ],
  },
];

export const getProfessorById = (id) => {
  return professors.find((p) => p.id.toString() === id);
};
