import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="similar-job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div className="similar-job-title-rating">
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="rating-star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-title">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="similar-job-footer">
        <div className="detail-item">
          <MdLocationOn className="detail-icon" />
          <p className="detail-text">{location}</p>
        </div>
        <div className="detail-item">
          <MdWork className="detail-icon" />
          <p className="detail-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
