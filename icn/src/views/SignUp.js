//dependencies
import React from 'react'
import {connect} from 'react-redux'

//styling
import "./SignUp.scss"
//components
import {attemptSignUp, getData, attemptLogin} from '../actions'
import SignUpForm from '../components/SignUpForm'

class SignUp extends React.Component {
    state = {
        admin: "No",
    };

    componentDidMount() {
        this.props.getData(`/api/countrylist`, 'country')
    }

    handleSubmit = values => {
        let admin = !(this.state.admin==='No')
        this.props.attemptSignUp(values, admin)
            .then(res => {
                this.props.attemptLogin({username: values.username, password: values.password})
                    .then(res => {
                        if(res)
                            this.props.history.push('/dashboard')
                    })
                
            })
    }

    adminChange = e => {
        this.setState({
            admin: e.target.value,
        })
    }

    render() {
        let sortedCountries = this.props.countries.sort((a,b) => a.country.localeCompare(b.country))
        return (
            <SignUpForm
                handleSubmit={this.handleSubmit}
                countries={sortedCountries}
                adminChange={this.adminChange}
                adminValue={this.state.admin}
            />
            
        );
    }
}



const mapStateToProps = (state) => ({
    countries: state.data.countries
})

const mapDispatchToProps = {
    attemptSignUp, getData, attemptLogin
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
