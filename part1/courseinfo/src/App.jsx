const Header = (props) =>{
  return(
    <>
      <p>{props.course}</p>
    </>
  )
}
const Content = (props) =>{
  console.log(props.parts.map((part)=> part.part));
  return(
    <>
      {props.parts.map((exercise, index) => (
        <p key={index}>
          {exercise.part} {exercise.exercises}
        </p>
      ))}
    </>
  )
}

const Total = (props) =>{
  let total = props.parts.reduce((sum, exercise) => sum + exercise.exercises, 0);

  return(
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {part: 'Fundamentals of React', exercises: 10},
      {part: 'Using props to pass data', exercises: 7},
      {part: 'State of a component', exercises: 14}
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total  parts={course.parts} />
    </div>
  )
}

export default App
