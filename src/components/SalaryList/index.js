import './index.css'

const SalaryList = props => {
  const {salaryDetails, salaryRange} = props
  const {salaryRangeId, label} = salaryDetails

  const onChangeSalary = event => {
    salaryRange(event.target.value)
  }

  return (
    <li className="listel" onChange={onChangeSalary}>
      <input
        className="inputRC"
        id={salaryRangeId}
        type="radio"
        name="salary"
        value={salaryRangeId}
      />
      <label className="label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryList
