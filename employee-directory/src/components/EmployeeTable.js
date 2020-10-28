import React from "react";
import API from '../utility/API'

class EmployeeTable extends React.Component {
    state = {
        result: [],
        filter: [],
        search: ""
    }
    componentDidMount(){
        this.employeeDirectory();
    }

    employeeDirectory = () =>{
        API.getUsers()
        // .then(res => console.log(res.data))
          .then(res => this.setState({ result: res.data.results}))
          .then(res => this.setState({ filter: this.state.result}))
          .catch(err => console.log(err))
    }
    handleInputChange = event => {
        const value = event.target.value;
        const filtered = this.state.result.filter(query => query.name.first.includes(value) || query.name.last.includes(value))
        this.setState({ filter: filtered })
    }

    render(){

        return(
            <>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" onChange={this.handleInputChange} type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> 

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.filter.map(element => (
                            <tr>
                                <th scope="row"><img alt={element.name.first} src={element.picture.thumbnail}></img></th>
                                <td>{element.name.first} {element.name.last}</td>
                                <td>{element.phone}</td>
                                <td>{element.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </>
        )
    }

}
export default EmployeeTable;