import { Component } from "react";
import axios from "axios";

class LecturerDash extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            profileData:{
                title:"",
                lecturerName:"",
            },
        };
    }

    componentDidMount() {
        
        const id = window.sessionStorage.getItem('id');
        const lecturerId = id;

        console.log("your id lecturer is", lecturerId);
        const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

        this.setState({isLoggedIn: isLoggedIn})

        console.log("Lecturer Id: ",lecturerId)
        axios.get('http://localhost:8083/api/v1/lecturer/profile/'+ lecturerId) 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ profileData: response.data.data[0] });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching batchs data:', error);
            });

    }

    render(){

        const {title, lecturerName} = this.state.profileData;

        return(
            <div>
                <h1 style={{textAlign:'center'}}>Welcome, Back {title} .{lecturerName}</h1>
            </div>
        )
    }
}
export default LecturerDash;