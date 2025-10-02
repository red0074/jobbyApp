import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <li className="job-card">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-card-logo"
          />
          <div className="job-card-title-section">
            <h1 className="job-title">{title}</h1>
            <div className="rating-section">
              <AiFillStar className="rating-star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-details">
          <div className="location-employment">
            <div className="detail-item">
              <MdLocationOn className="detail-icon" />
              <p className="detail-text">{location}</p>
            </div>
            <div className="detail-item">
              <MdWork className="detail-icon" />
              <p className="detail-text">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="divider" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
