import './index.css'
import {employmentTypesList, salaryRangesList} from '../utils/Constants'

const FiltersGroup = props => {
  const {selectedTypes, selectedSalary, onChangeType, onChangeSalary} = props

  const renderEmploymentTypes = () =>
    employmentTypesList.map(each => {
      const onTypeChange = () => onChangeType(each.employmentTypeId)
      return (
        <li key={each.employmentTypeId} className="filter-item">
          <input
            type="checkbox"
            id={each.employmentTypeId}
            checked={selectedTypes.includes(each.employmentTypeId)}
            onChange={onTypeChange}
            className="checkbox"
          />
          <label htmlFor={each.employmentTypeId} className="filter-label">
            {each.label}
          </label>
        </li>
      )
    })

  const renderSalaryRanges = () =>
    salaryRangesList.map(each => {
      const onSalaryChange = () => onChangeSalary(each.salaryRangeId)
      return (
        <li key={each.salaryRangeId} className="filter-item">
          <input
            type="radio"
            name="salary"
            id={each.salaryRangeId}
            checked={selectedSalary === each.salaryRangeId}
            onChange={onSalaryChange}
            className="radio"
          />
          <label htmlFor={each.salaryRangeId} className="filter-label">
            {each.label}
          </label>
        </li>
      )
    })

  return (
    <div className="filters-group">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">{renderEmploymentTypes()}</ul>

      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">{renderSalaryRanges()}</ul>
    </div>
  )
}

export default FiltersGroup
