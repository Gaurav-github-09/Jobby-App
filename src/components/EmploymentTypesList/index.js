import './index.css'

const EmploymentTypesList = props => {
  const {employmentDetails, updateEmpTypes} = props
  const {employmentTypeId, label} = employmentDetails

  const onChangeEmployType = () => {
    updateEmpTypes(employmentTypeId)
  }

  return (
    <li className="listel">
      <input
        className="inputRC"
        onChange={onChangeEmployType}
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypesList
