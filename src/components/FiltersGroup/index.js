import {
  employmentTypesList,
  salaryRangesList,
  locationsList,
} from '../utils/Constants'
import './index.css'

const FiltersGroup = props => {
  const {
    selectedTypes,
    selectedSalary,
    selectedLocations,
    onChangeType,
    onChangeSalary,
    onChangeLocation,
  } = props

  const renderEmploymentTypes = () => (
    <div className="filter-group">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(type => (
          <li key={type.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={type.employmentTypeId}
              className="filter-checkbox"
              checked={selectedTypes.includes(type.employmentTypeId)}
              onChange={() => onChangeType(type.employmentTypeId)}
            />
            <label htmlFor={type.employmentTypeId} className="filter-label">
              {type.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div className="filter-group">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(range => (
          <li key={range.salaryRangeId} className="filter-item">
            <input
              type="radio"
              id={range.salaryRangeId}
              name="salary"
              className="filter-radio"
              checked={selectedSalary === range.salaryRangeId}
              onChange={() => onChangeSalary(range.salaryRangeId)}
            />
            <label htmlFor={range.salaryRangeId} className="filter-label">
              {range.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderLocations = () => (
    <div className="filter-group">
      <h1 className="filter-heading">Location</h1>
      <ul className="filter-list">
        {locationsList.map(location => (
          <li key={location.locationId} className="filter-item">
            <input
              type="checkbox"
              id={location.locationId}
              className="filter-checkbox"
              checked={selectedLocations.includes(location.locationId)}
              onChange={() => onChangeLocation(location.locationId)}
            />
            <label htmlFor={location.locationId} className="filter-label">
              {location.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      <hr className="separator" />
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRanges()}
      <hr className="separator" />
      {renderLocations()}
    </div>
  )
}

export default FiltersGroup
