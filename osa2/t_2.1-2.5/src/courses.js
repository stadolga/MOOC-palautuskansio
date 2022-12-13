const Course = ({courses}) => (
  <>
  {courses.map((course, index) => (
    <div key={index}>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  ))}
  </>
)

const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)
const Content = (props) => {
  return(
  <div>
    {props.parts.map((part, index) => 
          <Part key={index} part={part.name} exercise={part.exercises}/>
          )}
  </div> 
)}

const Total = (props) => {
  return(
  <>
    <b> total of {props.parts.reduce((a,b) => a + b.exercises, 0)} exercises</b>
  </>
)}
const Part = (props) => (
  <p>
  {props.part} {props.exercise}
</p>
)


export default Course