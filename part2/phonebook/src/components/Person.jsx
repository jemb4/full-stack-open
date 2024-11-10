const Person = ({personToShow, deletePerson }) => {
    return(
        <div>
        <ul>
          {personToShow.map(person => 
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id)}>delete</button>
            </li>
          )}
        </ul>
      </div>
    )
}

export default Person