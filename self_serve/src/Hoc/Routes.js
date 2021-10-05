import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import UploadScreen from '../Components/BackgroundReplacement/UploadScreen'

class Routes extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    cookie = key=>((new RegExp((key || '=')+'=(.*?); ','gm')).exec(document.cookie+'; ') ||['',null])[1]
    componentDidMount = () => {
        
    }

    

    render() {
        
        return (
            <div>
                <Route path="/category/" exact component={UploadScreen}/>
            </div>
        )
    }
}

export default withRouter(Routes)
