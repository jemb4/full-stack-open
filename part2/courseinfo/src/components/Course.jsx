const Header = ({ name }) => {
    console.log("name", name)
    return(
        <>
            <h1>{name}</h1>
        </>
    )
}

const Part = ({ part }) => {
    return(
        <>
            <li>{part.name} {part.exercises}</li>
        </>
    )
}

const Content = ({parts}) => {
    return(
        <>
        <ul>
            {parts.map(part => 
                <Part key={part.id} part={part}/>
            )}
        </ul>
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, val)=>sum + val.exercises, 0)
    return(
        <>
            <b>total of {total} exercises</b>
        </>
    )
}

const Course = ({ course }) => {
    console.log("course", course)
    return(
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}
export default Course