// Dummy discussion data, keyed by examId
export const discussionData = {
  1: [
    // For exam with ID 1
    {
      id: "d1-1",
      author: "Alice",
      avatar: "A", // Simple letter avatar
      timestamp: "Yesterday at 8:15 PM",
      message:
        'For Question 2, is "unfolding" the room the only way? I was thinking about projecting the points.',
    },
    {
      id: "d1-2",
      author: "Bob",
      avatar: "B",
      timestamp: "Yesterday at 8:20 PM",
      message:
        "Unfolding is the standard approach. It simplifies the 3D problem into a 2D one, making it much easier to calculate the shortest path using the Pythagorean theorem: $d = \\sqrt{\\Delta x^2 + \\Delta y^2}$",
    },
  ],
  2: [
    // For exam with ID 2
    {
      id: "d2-1",
      author: "Charlie",
      avatar: "C",
      timestamp: "Today at 10:30 AM",
      message:
        "I keep getting the wrong answer for the displacement question. Can someone post the formula again?",
    },
    {
      id: "d2-2",
      author: "Admin",
      avatar: "AD",
      timestamp: "Today at 10:32 AM",
      message:
        "Certainly. The formula for displacement under constant acceleration is:\n\n$s = ut + \\frac{1}{2}at^2$\n\nAnd for the graph question, the displacement is the area under the curve. Here is a code snippet for calculating the area of a trapezoid:\n\n```javascript\nfunction trapezoidArea(base1, base2, height) {\n  return 0.5 * (base1 + base2) * height;\n}\n```",
    },
  ],
  // Add more discussions for other exam IDs as needed
};
