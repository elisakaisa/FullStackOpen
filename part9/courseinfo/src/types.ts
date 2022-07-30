interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartOneB extends CoursePartBase {
  name: "Advanced";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "Backend development";
  description: string;
  requirements: string[];
}

export type CoursePart = CoursePartOne | CoursePartOneB |
                          CoursePartTwo | CoursePartThree | CoursePartFour ;
