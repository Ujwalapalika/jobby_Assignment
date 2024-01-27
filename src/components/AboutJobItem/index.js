import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}
class AboutJobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsData = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApiUrl, optionsData)
    if (response.ok === true) {
      const data = response.json()
      console.log(data)
    }
  }

  render() {
    const {apiStatus, jobData} = this.state
    console.log(apiStatus, jobData)
    return <Header />
  }
}
export default AboutJobItem
