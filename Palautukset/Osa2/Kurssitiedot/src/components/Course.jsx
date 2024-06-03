

const Course=({course})=>{
    return(
        <>
        <Header course = {course}/>
        <Content parts = {course.parts}/>
        <TotalExcesiseAmount parts={course.parts}/>
        </>
    )
}

const Header=({course})=>{
    return(
        <>
        <h1>
            {course.name}
        </h1>
        </>
    )
}


const Content=({parts})=>{

    return(
        <>
            {parts.map(part =>
                <RenderPart key={part.id} part={part}/>)}
            
            
        </>
    )
}

const RenderPart=({part})=>{
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const TotalExcesiseAmount=({parts})=>{

    const totalExcersises = parts.reduce((sum, part) => sum + part.exercises, 0)

    return(
        <p>
            <b> Total number of exercises in this course is: {totalExcersises}</b> 
        </p>
    )
}

export default Course