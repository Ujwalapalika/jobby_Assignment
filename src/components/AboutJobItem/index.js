import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}
class AboutJobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailData: [],
    similarJobsData: [],
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
      const data = await response.json()
      console.log(data)
      const filteredJobDetails = [data.job_details].map(jobDetail => ({
        companyLogoUrl: jobDetail.company_logo_url,
        companyWebsiteUrl: jobDetail.company_website_url,
        employmentType: jobDetail.employment_type,
        id: jobDetail.id,
        jobDescription: jobDetail.job_description,
        location: jobDetail.location,
        skills: jobDetail.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: jobDetail.life_at_company.description,
          imageUrl: jobDetail.life_at_company.image_url,
        },
        packagePerAnnum: jobDetail.package_per_annum,
        rating: jobDetail.rating,
        title: jobDetail.title,
      }))
      const similarJobs = data.similar_jobs.map(similarJob => ({
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        id: similarJob.id,
        jobDescription: similarJob.job_description,
        location: similarJob.location,
        packagePerAnnum: similarJob.package_per_annum,
        rating: similarJob.rating,
        title: similarJob.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetailData: filteredJobDetails,
        similarJobsData: similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetailData, similarJobsData} = this.state
    if (jobDetailData.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        lifeAtCompany,
        jobDescription,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDetailData

      console.log(skills)
      return (
        <li className="jobItemContainer">
          <div className="first_part_container">
            <div className="img_title_container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="companyLogo"
              />
              <div className="title_container">
                <h1 className="heading">{title}</h1>
                <AiFillStar className="star_icon" />
                <p className="rating_text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location_employment_container">
            <div className="location_container">
              <MdLocationOn className="location" />
              <p className="loc_description">{location}</p>
            </div>
            <div className="employment_type_container">
              <p>{employmentType}</p>
            </div>
            <div className="package_container">
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr_line_container" />
          <div className="description_container">
            <div className="description_visit_container">
              <h1>Description</h1>
              <a href={companyWebsiteUrl}>
                Visit <BiLinkExternal />
              </a>
              <p>{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="skills_container">
              {skills.map(skillItem => (
                <li className="li_job_details" key={skillItem.name}>
                  <img
                    src={skillItem.imageUrl}
                    alt={skillItem.name}
                    className="skill_image"
                  />
                  <p>{skillItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="life_at_company_container">
              <div className="life_heading_para_container">
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul className="similar_jobs_container">
            {similarJobsData.map(eachJob => (
              <SimilarJobs key={eachJob.id} similarJobsData={eachJob} />
            ))}
          </ul>
        </li>
      )
    }
    return null
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobDetails()
  }

  renderFailure = () => (
    <>
      <div className="jobs_notFound">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notFound"
        />
        <button type="button" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    </>
  )

  renderJobDetailView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job_details_view_container">
          {this.renderJobDetailView()}
        </div>
      </>
    )
  }
}
export default AboutJobItem
