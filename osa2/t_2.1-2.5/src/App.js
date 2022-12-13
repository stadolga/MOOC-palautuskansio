import Course from './courses.js'
// MAIN APP

const App = ({courses}) => {
  return (
    <div>
      <Course courses = {courses}/>
    </div>
  )
}

export default App