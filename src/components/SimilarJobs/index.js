import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsData

  return (
    <li className="similar_job_item_container">
      <div className="img_job_container">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div className="title_job_container">
          <h1>{title}</h1>
          <div className="star_job_rating">
            <AiFillStar className="star_rating" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="description_container">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div className="location_employment_container">
        <div className="location_container">
          <MdLocationOn className="location" />
          <p className="loc_description">{location}</p>
        </div>
        <div className="employment_type_container">
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
