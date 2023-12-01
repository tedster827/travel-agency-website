const ListGroup: React.FunctionComponent = () => {
    const destinations = [
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris'
    ]
 return(
     <>
         <h2>Destination List!</h2>
         <ul
             className={"list-group"}
         >
             <li className={"list-group"}>
                 An item
             </li>
             <li className={"list-group"}>
                 A second item
             </li>
             <li className={"list-group"}>
                 A third item
             </li>
             <li className={"list-group"}>
                 A fourth item
             </li>
             <li className={"list-group"}>
                 A fifth item
             </li>
         </ul>
     </>
 )
}
export default ListGroup;