import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import JobItemDetails from '../JobItemDetails'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '100000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '200000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '300000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '400000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}
class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: {},
    jobsData: [],
    activeCheckBox: [],
    activeSalaryId: '',
    searchInput: '',
    apiJobStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const profile = data.profile_details
      const updatedProfile = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData: updatedProfile,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobData = async () => {
    this.setState({apiJobStatus: apiStatusConstants.inProgress})
    const {activeCheckBox, searchInput, activeSalaryId} = this.state
    const type = activeCheckBox.join(',')
    const JwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const filteredJobs = data.jobs.map(jobDetail => ({
        companyLogoUrl: jobDetail.company_logo_url,
        employmentType: jobDetail.employment_type,
        id: jobDetail.id,
        jobDescription: jobDetail.job_description,
        location: jobDetail.location,
        packagePerAnnum: jobDetail.package_per_annum,
        rating: jobDetail.rating,
        title: jobDetail.title,
      }))
      this.setState({
        apiJobStatus: apiStatusConstants.success,
        jobsData: filteredJobs,
      })
    } else {
      this.setState({apiJobStatus: apiStatusConstants.failure})
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobData()
    }
  }

  onSubmitSearch = () => {
    this.getJobData()
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          className="search_input"
          value={searchInput}
          placeholder="search"
          onChange={this.onSearchInput}
          onKeyDown={this.onEnterSearch}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="searchBtn"
          onClick={this.onSubmitSearch}
        >
          h<AiOutlineSearch />
        </button>
      </>
    )
  }

  onClickCheckBox = event => {
    const {activeCheckBox} = this.state
    if (activeCheckBox.includes(event.target.id)) {
      const updateList = activeCheckBox.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({activeCheckBox: updateList}, this.getJobData())
    } else {
      this.setState(
        prevState => ({
          activeCheckBox: [...prevState.activeCheckBox, event.target.value],
        }),
        this.getJobData(),
      )
    }
  }

  selectSalary = event => {
    this.setState({activeSalaryId: event.target.value}, this.getJobData())
  }

  onCheckBoxInput = () => (
    <ul className="checkbox_container">
      {employmentTypesList.map(employmentType => (
        <li className="li_container" key={employmentType.employmentTypeId}>
          <input
            type="checkbox"
            id={employmentType.employmentTypeId}
            className="input"
            onChange={this.onClickCheckBox}
          />
          <label className="label" htmlFor={employmentType.employmentTypeId}>
            {employmentType.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderRadioButton = () => (
    <ul className="radio_container">
      {salaryRangesList.map(salary => (
        <li className="li_container" key={salary.salaryRangeId}>
          <input
            type="radio"
            className="radio"
            name="option"
            onChange={this.selectSalary}
          />
          <label className="label" htmlFor={salary.salaryRangeId}>
            {salary.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile_container">
        <img src={profileImageUrl} alt="name" className="pi" />
        <p>{name}</p>
        <p>{shortBio}</p>
      </div>
    )
  }

  retryBtn = () => {
    this.getProfileData()
  }

  renderFailureProfileView = () => (
    <div className="profile_container">
      <h1>profile Fail</h1>
      <button type="button" onClick={this.retryBtn}>
        Retry
      </button>
    </div>
  )

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureJobView = () => (
    <>
      <div className="jobs_notFound">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notFound"
        />
      </div>
    </>
  )

  renderSuccessJobView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="noJobs_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobs"
        />
        <h1>No jobs found</h1>
        <p>We could not found any jobs. Try other Filters</p>
      </div>
    ) : (
      <ul>
        {jobsData.map(jobs => (
          <JobItemDetails key={jobs.id} jobItem={jobs} />
        ))}
      </ul>
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureProfileView()
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      default:
        return ''
    }
  }

  onRenderJobs = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobView()
      case apiStatusConstants.failure:
        return this.renderFailureJobView()
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="body_container">
          <div className="search">{this.renderSearch()}</div>
          <div className="side_container">
            {this.renderProfile()}
            <hr className="hr_line" />
            <h1>Type Of Employment</h1>
            {this.onCheckBoxInput()}
            <hr className="hr_line" />
            <h1>Salary Range</h1>
            {this.renderRadioButton()}
          </div>
          <div className="jobs_container">{this.onRenderJobs()}</div>
        </div>
      </>
    )
  }
}
export default Jobs
