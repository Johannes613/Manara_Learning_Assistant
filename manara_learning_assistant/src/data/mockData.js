// In a real app, this data would come from your backend API
const problems = {
  1: {
    // Corresponds to exam.id = 1
    id: 1,
    title: "MTT-102: The Spider and the Fly",
    questions: [
      {
        id: "q1",
        text: "What is the shortest path for the spider to reach the fly on the same surface?",
        answer: "A straight line between the spider and the fly.",
      },
      {
        id: "q2",
        text: "How does the problem change if the spider and fly are on opposite walls?",
        answer:
          'The path involves "unfolding" the room into a 2D plane to find the straight-line distance across the net.',
      },
      {
        id: "q3",
        text: "Describe the formula to calculate the distance on an unfolded net.",
        answer:
          "It becomes a standard Pythagorean theorem calculation: $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$ on the unfolded 2D coordinates.",
      },
    ],
  },
  2: {
    // Corresponds to exam.id = 2
    id: 2,
    title: "PHY-201: Kinematics Challenge",
    questions: [
      {
        id: "q1",
        text: "What is the formula for displacement under constant acceleration?",
        answer: "The formula is $s = ut + \\frac{1}{2}at^2$.",
      },
    ],
  },
  3: {
    id: 3,
    title: "CS-101: Basic Algorithms",
    questions: [
      {
        id: "q1",
        text: "Write a Java method `fibonacci` that takes an integer $n$ as input and returns the $n$-th number in the Fibonacci sequence. The sequence is defined by the recurrence relation:\n\n$F_n = F_{n-1} + F_{n-2}$\n\nwith seed values $F_0 = 0$ and $F_1 = 1$.",
        answer:
          "```java\npublic class Solution {\n    public int fibonacci(int n) {\n        if (n <= 1) {\n            return n;\n        }\n\n        int a = 0, b = 1;\n\n        for (int i = 2; i <= n; i++) {\n            int sum = a + b;\n            a = b;\n            b = sum;\n        }\n\n        return b;\n    }\n}\n```",
      },
    ],
  },
  4: {
    id: 4,
    title: "CS-101: Basic Algorithms",
    questions: [
      {
        id: "q1",
        text: "Write a Java method `fibonacci` that takes an integer $n$ as input and returns the $n$-th number in the Fibonacci sequence. The sequence is defined by the recurrence relation:\n\n$F_n = F_{n-1} + F_{n-2}$\n\nwith seed values $F_0 = 0$ and $F_1 = 1$.",
        answer:
          "```java\npublic class Solution {\n    public int fibonacci(int n) {\n        if (n <= 1) {\n            return n;\n        }\n\n        int a = 0, b = 1;\n\n        for (int i = 2; i <= n; i++) {\n            int sum = a + b;\n            a = b;\n            b = sum;\n        }\n\n        return b;\n    }\n}\n```",
      },
    ],
  },
};

export const getProblemById = (id) => {
  return problems[id] || null;
};
