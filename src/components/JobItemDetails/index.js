import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobItemDetails = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`} className="Link">
      <li className="jobItems">
        <div className="first_part_container">
          <div className="img_title_container">
            <img
              src={companyLogoUrl}
              alt="company logo"
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItemDetails
